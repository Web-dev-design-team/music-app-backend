/* eslint-disable import/prefer-default-export */
import crypto from 'crypto';

export const randomString = () => crypto.randomBytes(32).toString('hex');
