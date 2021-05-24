import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer } from 'http';
import Redis from 'ioredis';
import RateLimitRedisStore from 'rate-limit-redis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import {
  COOKIE_NAME,
  REDIS_CACHE_PREFIX,
  REDIS_SESSION_PREFIX,
  __prod__,
  __test__,
} from './constants';
import { Listing } from './entity/Listing';
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

  const redisPubsub = new RedisPubSub();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ListingResolver, MessageResolver, UserResolver],
      pubSub: redisPubsub,
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      redisPubsub,
      userLoader: createUserLoader(),
    }),
    subscriptions: {
      path: '/subscriptions',
      onConnect: (connectionParams, webSocket, context) =>
        console.log('subscriptions connect'),
      onDisconnect: (webSocket, context) =>
        console.log('subscriptions disconnect', webSocket, context),
    },
  });

  const server = createServer(app);

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  apolloServer.installSubscriptionHandlers(server);

  await redis.del(REDIS_CACHE_PREFIX);

  const listings = await Listing.find({});
  const listingStrings = listings.map((listing) => JSON.stringify(listing));
  await redis.lpush(REDIS_CACHE_PREFIX, ...listingStrings);

  server.listen(parseInt(__test__ ? '0' : process.env.PORT), async () => {
    console.log(
      `Server running on port ${process.env.PORT} ${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscriptions running on port ${process.env.PORT} ${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
