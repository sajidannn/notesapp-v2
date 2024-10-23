import { createUser, findUserById } from "./user.repository.js";
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import InvariantError from "../../exception/InvariantError.js";
import NotFoundError from "../../exception/NotFoundError.js";

const addUser = async ({ username, password, fullname }) => {
  await verifyNewUsername(username);
  const id = `user-${nanoid(16)}`;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userId = await createUser({ id, username, hashedPassword, fullname });

  if (!userId) {
    throw new InvariantError('User could not be created');
  }

  return userId;
};

const verifyNewUsername = async (username) => {
  const user = await findUserById(username);
  if (user) {
    throw new InvariantError('Username already exists');
  }
}

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (!user) {
    throw new NotFoundError('User not found');
  };

  return user;
};

export {
  addUser,
  getUserById
};