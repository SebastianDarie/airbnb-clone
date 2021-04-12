import { Connection } from 'typeorm';
import faker from 'faker';

import { User } from '../../../entity/User';
import { createTestConn } from '../../../test-utils/createTestConn';
import { gCall } from '../../../test-utils/gCall';

let userId: string;
let conn: Connection;
faker.seed(Date.now() + 3);
const email = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  conn = await createTestConn();
  const user = await User.create({
    email,
    password,
    confirmed: true,
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await conn.close();
});

const loginMutation = `
mutation Login($email: String!, $password:String!){
  login(email: $email, password: $password){
    errors{
      path
      message
    }
    
    user{
      email
      confirmed
      forgotPasswordLocked
      createdAt
    }
  }
}`;

const meQuery = `
query{
  me{
    id
    email
    confirmed
    forgotPasswordLocked
  }
}
`;

describe('me', () => {
  test('return null if no cookie', async () => {
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: null,
      },
    });
  });

  test('get current user', async () => {
    await gCall({
      source: loginMutation,
      variableValues: {
        data: {
          email,
          password,
        },
      },
    });
    const response = await gCall({
      source: meQuery,
    });

    expect(response).toMatchObject({
      data: {
        me: {
          id: userId,
          email,
          confirmed: true,
          forgotPasswordLocked: false,
        },
      },
    });
  });
});
