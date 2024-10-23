import prisma from '../../db/index.js';

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
  const note = await prisma.notes.create({
    data: {
      title,
      body,
      tags,
    },
  });

  return note.id;
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

export {
  findNotes,
  createNote,
  findNoteById,
  deleteNote,
  editNote
};