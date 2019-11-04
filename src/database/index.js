import Knex from 'knex';
import { Model } from 'objection';
import dotenv from 'dotenv';

dotenv.config();

const databaseConnection = Knex(config.database[process.env.NODE_ENV]);

Model.knex(databaseConnection);

export default databaseConnection;