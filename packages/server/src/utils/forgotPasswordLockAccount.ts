import { Redis } from 'ioredis';
import { removeAllUsersSessions } from './removeAllUsersSessions';
import { User } from '../entity/User';

export const forgotPasswordLockAccount = async (
  userId: string,
  redis: Redis
) => {
  await User.update({ id: userId }, { forgotPasswordLocked: true });
  await removeAllUsersSessions(userId, redis);
};
