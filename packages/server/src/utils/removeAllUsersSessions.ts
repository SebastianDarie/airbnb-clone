import { Redis } from 'ioredis';
import { USER_SESSION_ID_PREFIX, REDIS_SESSION_PREFIX } from '../constants';

export const removeAllUsersSessions = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(
    `${USER_SESSION_ID_PREFIX}${userId}`,
    0,
    -1
  );

  const promises = [];
  for (let i = 0; i < sessionIds.length; i += 1) {
    promises.push(redis.del(`${REDIS_SESSION_PREFIX}${sessionIds[i]}`));
  }
  await Promise.all(promises);
};
