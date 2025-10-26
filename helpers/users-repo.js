// helpers/users-repo.js

const users = [
  { id: 1, name: 'Juan', lastName: 'Pérez', email: 'juan@example.com' },
  { id: 2, name: 'María', lastName: 'Gómez', email: 'maria@example.com' },
  // Agrega más usuarios según sea necesario
];

export const usersRepo = {
  getAll: () => users,
  getById: (id) => users.find((user) => user.id === id),
  create: ({ name, lastName, email }) => {
    const newUser = { id: users.length + 1, name, lastName, email };
    users.push(newUser);
    return newUser;
  },
  update: (id, { name, lastName, email }) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      user.name = name;
      user.lastName = lastName;
      user.email = email;
    }
    return user;
  },
  delete: (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  },
  deleteAllUsers: () => {
    users.length = 0;
  },
};
