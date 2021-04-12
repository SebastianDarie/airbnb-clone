import path from 'path';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';

export const createTypeormConn = () => {
  return createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, '../migrations/*')],
    entities: [User],
  });
};
