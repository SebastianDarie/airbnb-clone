import path from 'path';
import { createConnection } from 'typeorm';
import { User } from '../entity/User';

export const createTestConn = (drop: boolean = false) => {
  return createConnection({
    type: 'postgres',
    url: process.env.TEST_DATABASE_URL,
    logging: false,
    synchronize: drop,
    dropSchema: drop,
    migrations: [path.join(__dirname, '../migrations/*')],
    entities: [User],
  });
};
