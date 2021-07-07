import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';
import { createMessageLoader } from './loaders/createMessageLoader';
import { createUserLoader } from './loaders/createUserLoader';

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: string };
  };
  res: Response;
  redis: Redis;
  redisPubsub: RedisPubSub;
  messageLoader: ReturnType<typeof createMessageLoader>;
  userLoader: ReturnType<typeof createUserLoader>;
};
