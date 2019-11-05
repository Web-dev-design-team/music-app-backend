import jwt from 'jsonwebtoken';
import User from '@models/User';
import { AuthenticationError } from 'apollo-server-express';
import { SECRET } from '../env';

const decodeToken = (tokenStr) => jwt.verify(tokenStr, SECRET, (err, data) => {
  if (err) throw new Error('invalid token');
  return data;
});

export default async (token) => {
  try {
    const { id } = decodeToken(token);
    const user = await User.query().findById(id);

    if (!user) throw new AuthenticationError('Invalid token!');
    return user;
  } catch (error) {
    // throw auth error
    throw new AuthenticationError('Invalid token!');
  }
};
