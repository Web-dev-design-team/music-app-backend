import User from '@models/User';
import { UserInputError, AuthenticationError } from 'apollo-server-express';
import { validateLogin, validateSignUp, validateProfile } from '@validations';
import { randomString, bycryptHash } from '@utils';

const users = async () => {
  // TODO Projection Pagination

  const allUsers = await User.query();
  return allUsers;
};

const user = async (_, { id }, { user: authUser }) => {
  // TODO Projection Pagination

  if (id) {
    const fetchUser = await User.query().findById(id);
    return fetchUser;
  }
  return authUser;
};

const updateProfile = async (_, args, { user: thisUser }) => {
  validateProfile(args, UserInputError);

  await thisUser.$query().patch(args);

  return thisUser;
};

const signUp = async (_, args) => {
  // validation
  validateSignUp(args, UserInputError);
  // create user
  const newUser = await User.query()
    .insert({
      ...args,
    })
    .returning('*');

  return newUser.response();
};

const login = async (_, args) => {
  const { email, password } = args;
  // validation
  validateLogin(args, UserInputError);
  // check and return user
  const thisUser = await User.query()
    .where({
      email,
    })
    .first();
  if (!thisUser) {
    throw new UserInputError('user does not exist');
  }

  if (!thisUser.checkPassword(password)) {
    throw new UserInputError('invalid password');
  }

  return thisUser.response();
};

const verifyUser = async (_, { verificationCode }) => {
  const thisUser = await User.query()
    .findOne({
      emailVerified: verificationCode,
    })
    .first();

  if (!thisUser) throw new AuthenticationError('Invalid verification code');

  await thisUser.$query().patch({ emailVerified: null });
  const res = await thisUser.response();
  return {
    ...res,
    message: 'Account verification successful'
  };
};

const resendVerificationLink = async (_, __, { user: thisUser }) => {
  if (!thisUser.emailVerified) return 'Email has already been verified';

  await thisUser.$query().patch({ emailVerified: randomString() });
  await thisUser.sendVerificationMail();

  return 'Verification link sent';
};

const resetPassword = async (_, { email }) => {
  const thisUser = await User.query()
    .where({
      email,
    })
    .first();

  await thisUser.$query().patch({ password: randomString() });
  await thisUser.sendPasswordResetMail();

  return 'Password reset mail sent';
};

const changePassword = async (_, { passwordToken, newPassword }) => {
  const thisUser = await User.query()
    .where({
      password: passwordToken,
    })
    .first();

  if (!thisUser) return new AuthenticationError('Invalid password reset token');

  const hashed = await bycryptHash(newPassword);
  await thisUser.$query().patch({ password: hashed });

  return 'Password changed successfully';
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
    verifyUser,
    resendVerificationLink,
    resetPassword,
    changePassword
  },
};
