import express from 'express';
import consola from 'consola';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import databaseConnection from './database';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { PORT } from '@env';
import AuthDirective from './directives/auth';

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective,
  },
  context: ({ req }) => ({ user: null, token: req.headers.token })
});

server.applyMiddleware({ app });

app.listen(PORT || 4000, () => {
  consola.success(`server start at port ${PORT}`);
});

export default { app, databaseConnection };
