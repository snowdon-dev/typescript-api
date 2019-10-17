// note: hardly production quality RNG
export const uidGen = (length: number): string => {
  let result = '';
  const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += c.charAt(Math.floor(Math.random() * c.length));
  }
  return result;
};
