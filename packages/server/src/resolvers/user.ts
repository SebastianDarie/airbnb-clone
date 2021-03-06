import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import argon2 from 'argon2';
import { v4 } from 'uuid';
import { getConnection } from 'typeorm';
import { User } from '../entity/User';
import { MyContext } from '../types';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants';
import { formatYupError } from '../utils/formatYupError';
import { sendEmail } from '../utils/sendEmail';
import { changePasswordSchema, registerSchema } from '@second-gear/common';
import { UserInput } from './input';

@ObjectType()
class FieldError {
  @Field()
  path?: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext): string {
    if (req.session.userId === user.id) {
      return user.email;
    }

    return '';
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() { req }: MyContext): Promise<User | undefined> | null {
    if (!req.session.userId) {
      return null;
    }

    return User.findOne(req.session.userId);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('credentials') credentials: UserInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    try {
      await registerSchema.validate({ ...credentials }, { abortEarly: false });
    } catch (err) {
      return { errors: formatYupError(err) };
    }

    const hashedPassword = await argon2.hash(credentials.password);
    let user;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          email: credentials.email,
          name: credentials.name,
          password: hashedPassword,
        })
        .returning('*')
        .execute();

      user = result.raw[0];
    } catch (err) {
      if (err.code === '23505') {
        return {
          errors: [
            {
              path: 'email',
              message: 'email already taken',
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        errors: [
          {
            path: 'email',
            message: "email doesn't exist",
          },
        ],
      };
    }

    if (user.forgotPasswordLocked) {
      return {
        errors: [
          {
            path: 'email',
            message: 'your account is locked',
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            path: 'password',
            message: 'incorrect password',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext
  ): Promise<boolean> {
    const user = await User.findOne({ email });
    if (!user) {
      return true;
    }

    await User.update({ id: user.id }, { forgotPasswordLocked: true });

    const token = v4();

    await redis.set(
      FORGOT_PASSWORD_PREFIX + token,
      user.id,
      'ex',
      1000 * 60 * 60 * 24 * 3
    );

    await sendEmail(
      email,
      'Change Password',
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">Reset your password</a>`
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    const valid = await changePasswordSchema.isValid({ newPassword });
    if (!valid) {
      return {
        errors: [
          {
            path: 'newPassword',
            message: 'length must be longer than 2',
          },
        ],
      };
    }

    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) {
      return {
        errors: [
          {
            path: 'token',
            message: 'token expired',
          },
        ],
      };
    }

    const user = await User.findOne(userId);

    if (!user) {
      return {
        errors: [{ path: 'user', message: 'user no longer exists' }],
      };
    }

    await User.update(
      { id: userId },
      { forgotPasswordLocked: false, password: await argon2.hash(newPassword) }
    );

    await redis.del(key);

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Arg('email') email: string,
    @Ctx() { req, res }: MyContext
  ): Promise<Boolean> {
    await User.delete({ email });
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      });
    });
  }
}
