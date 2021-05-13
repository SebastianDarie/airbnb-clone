import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { PubSub } from 'graphql-subscriptions';
import { Redis } from 'ioredis';
import { createUserLoader } from './loaders/createUserLoader';

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: string };
  };
  res: Response;
  redis: Redis;
  pubsub: PubSub;
  userLoader: ReturnType<typeof createUserLoader>;
};
