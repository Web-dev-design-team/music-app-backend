import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const bycryptHash = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
export const randomString = () => crypto.randomBytes(32).toString('hex');
