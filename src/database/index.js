import Knex from 'knex';
import { Model } from 'objection';
import config from './config';
import dotenv from 'dotenv';

dotenv.config();

const databaseConnection = Knex(config[process.env.NODE_ENV]);

Model.knex(databaseConnection);

export default databaseConnection;