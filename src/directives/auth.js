/* eslint-disable func-names */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import authenticate from '@auth';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [, , context] = args;
      const thisUser = await authenticate(context.token);
      args[2] = { ...context, user: thisUser };
      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
