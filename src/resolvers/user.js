import User from '@models/User';
import { UserInputError } from 'apollo-server-express';
import { validateLogin, validateSignUp } from '@validations';
import authenticate from '@auth';

const users = async (_, __, { token }) => {
  // TODO AUTH Projection Authentication Pagination
  await authenticate(token);
  const users = await User.query();
  return users;
};

const user = async (_, { id }, { token }) => {
  // TODO AUTH Projection Authentication Pagination
  await authenticate(token);
  // TODO AUTH Projection Authentication
  const authUser = await authenticate(token);
  if (id) {
    const user = await User.query().findById(id);
    return user;
  }
  return authUser;
};

const updateProfile = async (_, __, { token }) => {
  // TODO AUTH Projection Authentication Pagination
  const { id } = await authenticate(token);

  validateProfileUpdate(args, UserInputError);
     //update user
  const user = await User.query().findById(someId).patch(args)

  return user;
};

const signUp = async (_, args) => {
  //validation
  validateSignUp(args, UserInputError);
  // create user
  const user = await User.query()
    .insert({
      ...args,
    })
    .returning('*');

  return user.response();
};

const login = async (_, args) => {
  const { email, password } = args;

  //validation
  validateLogin(args, UserInputError);
  // check and return user
  const user = await User.query()
    .where({
      email,
    })
    .first();
  if (!user) {
    throw new UserInputError('user does not exist');
  }

  if (!user.checkPassword(password)) {
    throw new UserInputError('invalid password');
  }

  return user.response();
};

export default {
  Query: {
    user,
    users,
  },
  Mutation: {
    signUp,
    login,
    updateProfile,
  },
};
