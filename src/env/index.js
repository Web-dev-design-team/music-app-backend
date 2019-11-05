import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  SECRET,
  SENDGRID_API_KEY,
  NODE_ENV,
  DATABASE_CLIENT,
  DATABASE_URL,
  MAIL_USERNAME,
  MAIL_PASSWORD
} = process.env;
