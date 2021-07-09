// import create from 'zustand';
// import { combine } from 'zustand/middleware';

// const initialState = {
//   startDate: (null as unknown) as Date,
//   endDate: (null as unknown) as Date,
//   adults: 0,
//   children: 0,
//   infants: 0,
// };

// export const useReservationStore = create(
//   combine(initialState, (set) => ({
//     updateStart: (date: Date) => {
//       set((state) => ({
//         ...state,
//         startDate: date,
//       }));
//     },

//     updateEnd: (date: Date) => {
//       set((state) => ({
//         ...state,
//         endDate: date,
//       }));
//     },

//     updateAdults: (value: number) =>
//       set((state) => ({
//         ...state,
//         adults: value,
//       })),

//     updateChildren: (value: number) =>
//       set((state) => ({
//         ...state,
//         children: value,
//       })),

//     updateInfants: (value: number) =>
//       set((state) => ({
//         ...state,
//         infants: value,
//       })),
//   }))
// );
