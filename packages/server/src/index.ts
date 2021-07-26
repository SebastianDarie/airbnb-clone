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
import { Connection, getConnection } from 'typeorm';
import {
  COOKIE_NAME,
  REDIS_CACHE_PREFIX,
  REDIS_SESSION_PREFIX,
  __prod__,
} from './constants';
import { Listing } from './entity/Listing';
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
  let conn: Connection | null = null;
  let retries = 5;
  while (retries) {
    try {
      conn = await createTypeormConn();
      break;
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  if (conn) {
    await conn.runMigrations();
  }

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.set('trust proxy', 1);

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
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

  const redisPubsub = new RedisPubSub();

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

  await redis.del(REDIS_CACHE_PREFIX);

  const listings = await Listing.find({});
  const listingStrings = listings.map((listing) => JSON.stringify(listing));
  if (listingStrings.length > 0) {
    await redis.lpush(REDIS_CACHE_PREFIX, ...listingStrings);
  }

  const port = process.env.PORT || 8080;
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
