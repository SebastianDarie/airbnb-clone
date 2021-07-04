export const convertToUTC = (date: Date): Date => {
  const res = new Date(date);
  res.setMinutes(res.getMinutes() - res.getTimezoneOffset());
  return res;
};
