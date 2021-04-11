import 'reflect-metadata';
import 'dotenv-safe/config';
import path from 'path';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { ApolloServer } from 'apollo-server-express';
import {
  COOKIE_NAME,
  REDIS_SESSION_PREFIX,
  __prod__,
  __test__,
} from './constants';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { UserResolver } from './resolvers/user';
import { buildSchema } from 'type-graphql';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    dropSchema: __test__,
    migrations: [path.join(__dirname, './migration/*')],
    entities: [User],
  });

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  if (__test__) {
    await redis.flushall();
  }

  app.set('trust proxy', 1);

  app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        prefix: REDIS_SESSION_PREFIX,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        //domain: __prod__ ? '.reddit-clone.tech' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SECRET,
      resave: false,
    })
  );
  app.use(
    new (RateLimit as any)({
      store: new RateLimitRedisStore({
        client: redis,
      }),
      windowMs: 15 * 60 * 1000,
      max: 100,
      delayMs: 0,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(parseInt(__test__ ? '0' : process.env.PORT), () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
};

main().catch((err) => {
  console.error(err);
});
