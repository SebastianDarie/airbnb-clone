import path from 'path';
import { createConnection } from 'typeorm';
import { Header } from '../entity/Header';
import { Listing } from '../entity/Listing';
import { Message } from '../entity/Message';
import { Reservation } from '../entity/Reservation';
import { Review } from '../entity/Review';
import { User } from '../entity/User';

export const createTypeormConn = () => {
  return createConnection({
    name: 'default',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    cache: {
      // type: 'ioredis/cluster',
      // options: {
      //   startupNodes: [
      //     {
      //       host: 'localhost',
      //       port: 7000,
      //     },
      //     {
      //       host: 'localhost',
      //       port: 7001,
      //     },
      //     {
      //       host: 'localhost',
      //       port: 7002,
      //     },
      //   ],
      //   options: {
      //     scaleReads: 'all',
      //     clusterRetryStrategy: function (_times: any) {
      //       return null;
      //     },
      //     redisOptions: {
      //       maxRetriesPerRequest: 1,
      //     },
      //   },
      // },
      type: 'redis',
      duration: 5000,
      // options: {
      //   host: 'localhost',
      //   port: 6369,
      // },
    },
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, '../migrations/*')],
    entities: [Header, Listing, Message, Reservation, Review, User],
  });
};
