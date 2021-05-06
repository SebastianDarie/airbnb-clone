import DataLoader from 'dataloader';
import { User } from '../entity/User';

export const createUserLoader = (): DataLoader<string, User, string> =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.findByIds(userIds as string[]);
    const userIdToUser: Record<string, User> = {};

    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    return userIds.map((userId) => userIdToUser[userId]);
  });
