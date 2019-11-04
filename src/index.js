import express from 'express';
import consola from 'consola';
import dotenv from 'dotenv';
import databaseConnection from './database';

dotenv.config();

const app = express();

const { PORT } = process.env;

app.listen(PORT || 4000, () => {
  consola.success(`server start at port ${PORT}`);
});

export default { app, databaseConnection };
