const prisma = require('../../db/index');

const findNotes = async () => {
  return await prisma.notes.findMany();
};

const findNoteById = async (id) => {
  return await prisma.notes.findUnique({
    where: {
      id,
    },
  });
};

const createNote = async ({ title, body, tags }) => {
  return await prisma.notes.create({
    data: {
      title,
      body,
      tags,
    },
  });
};

const editNote = async ({ id, title, body, tags }) => {
  await prisma.notes.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      tags,
    },
  });
};

const deleteNote = async (id) => {
  await prisma.notes.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  findNotes,
  createNote,
  findNoteById,
  deleteNote,
  editNote
};