import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { createServer } from 'http';
import Redis from 'ioredis';
import RateLimitRedisStore from 'rate-limit-redis';
import { buildSchema } from 'type-graphql';
import { getConnection } from 'typeorm';
import { COOKIE_NAME, __prod__ } from './constants';
import { createUserLoader } from './loaders/createUserLoader';
import { HeaderResolver } from './resolvers/header';
import { ListingResolver } from './resolvers/listing';
import { MessageResolver } from './resolvers/message';
import { ReviewResolver } from './resolvers/review';
import { UserResolver } from './resolvers/user';
import { createTypeormConn } from './utils/createTypeormConn';
import { ReservationResolver } from './resolvers/reservation';
import { ApolloServerLoaderPlugin } from 'type-graphql-dataloader';

const main = async () => {
  const conn = await createTypeormConn();

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set('trust proxy', 1);

  app.use(
    cors({ origin: process.env.CORS_ORIGIN, credentials: true, maxAge: 86400 })
  );
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
        domain: __prod__ ? '.mernlabs.team' : undefined,
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
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  const options: Redis.RedisOptions = {
    host: '127.0.0.1',
    port: 6379,
    reconnectOnError: (err) => {
      const targetError = 'READONLY';
      if (err.message.includes(targetError)) {
        return true;
      }
      return false;
    },
    retryStrategy: (times) => {
      return Math.min(times * 50, 2000);
    },
  };

  const redisPubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HeaderResolver,
        ListingResolver,
        MessageResolver,
        ReservationResolver,
        ReviewResolver,
        UserResolver,
      ],
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
      onConnect: (_connectionParams, _webSocket, _context) =>
        console.log('subscriptions connect'),
      onDisconnect: (_webSocket, _context) =>
        console.log('subscriptions disconnect'),
    },
    plugins: [
      ApolloServerLoaderPlugin({ typeormGetConnection: getConnection }),
    ],
  });

  const server = createServer(app);

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  apolloServer.installSubscriptionHandlers(server);

  const port = process.env.PORT;
  server.listen(port, async () => {
    console.log(`Server running on port ${port} ${apolloServer.graphqlPath}`);
    console.log(
      `Subscriptions running on port ${port} ${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.error(err);
});
