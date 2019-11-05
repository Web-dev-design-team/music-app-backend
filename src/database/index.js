import Knex from 'knex';
import { Model } from 'objection';
import config from './config';
import { NODE_ENV } from '@env';

const databaseConnection = Knex(config[NODE_ENV]);

Model.knex(databaseConnection);

export default databaseConnection;
