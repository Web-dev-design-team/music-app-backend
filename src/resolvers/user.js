const userData = [
  {
    name: 'cyrax',
    id: '1',
    username: 'cy',
    bio: null,
    password: 'password',
    email: 'T@gmail.com',
    avatar: null,
  },
  {
    name: 'kelvin',
    id: '2',
    username: 'kevoese',
    bio: null,
    password: 'password',
    email: 'k@gmail.com',
    avatar: null,
  },
];

const signUp = (_, args) => {
  const user = {
    id: users.length + 1,
    bio: null,
    avatar: null,
    ...args,
  };
  userData.push(user);
  return user;
};

const users = (_, { id, username }) => {
    return id || username
      ? userData.filter(e => e.username == username || e.id === id)
      : userData;
  };

  const user = (_, { id, username }) => {
    return userData.find(e => e.username == username || e.id === id)
  };


export default {
    Query: {
        user,
        users
    },
    Mutation: {
        signUp
    }
}
