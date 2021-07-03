import path from 'path';
import { createConnection } from 'typeorm';
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
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, '../migrations/*')],
    entities: [Listing, Message, Reservation, Review, User],
  });
};
