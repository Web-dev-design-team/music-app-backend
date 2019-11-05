import express from 'express';
import consola from 'consola';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import databaseConnection from './database';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

dotenv.config();

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ token: req.headers.token })
});

server.applyMiddleware({ app });

const { PORT } = process.env;

app.listen(PORT || 4000, () => {
  consola.success(`server start at port ${PORT}`);
});

export default { app, databaseConnection };
