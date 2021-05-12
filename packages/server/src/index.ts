import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import Redis from 'ioredis';
import RateLimitRedisStore from 'rate-limit-redis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import {
  COOKIE_NAME,
  REDIS_SESSION_PREFIX,
  __prod__,
  __test__,
} from './constants';
import { createUserLoader } from './loaders/createUserLoader';
import { ListingResolver } from './resolvers/listing';
import { MessageResolver } from './resolvers/message';
import { UserResolver } from './resolvers/user';
import { createTypeormConn } from './utils/createTypeormConn';

const main = async () => {
  const conn = await createTypeormConn();

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
      resolvers: [ListingResolver, MessageResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
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
