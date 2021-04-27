// import { Request, Response } from 'express';
// import { CONFIRM_EMAIL_PREFIX } from '../constants';

// export const confirmEmail = async(req: Request, res: Response) => {
//   const key = CONFIRM_EMAIL_PREFIX + req.params;
//     const userId = await redis.get(key);
//     if (!userId) {
//       return {
//         errors: [
//           {
//             path: 'token',
//             message: 'token expired',
//           },
//         ],
//       };
//     }

//     const user = await User.findOne(userId);

//     if (!user) {
//       return {
//         errors: [{ path: 'user', message: 'user no longer exists' }],
//       };
//     }

//     await User.update({ id: userId }, { confirmed: true });

//     await redis.del(key);

//     req.session.userId = user.id;

//     return { user };
// }
