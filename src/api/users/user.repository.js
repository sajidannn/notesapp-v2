import prisma from "../../db/index.js";

const createUser = async ({ id, username, hashedPassword, fullname }) => {
  const user = await prisma.users.create({
    data: {
      id,
      username,
      password: hashedPassword,
      fullname,
    },
  });

  return user.id;
};

const findUserById = async (id) => {
  return await prisma.users.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      username: true,
      fullname: true,
    },
  });
};

export { createUser, findUserById };