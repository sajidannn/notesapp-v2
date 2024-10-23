import prisma from '../../db/index.js';

const createNote = async ({ id, title, body, tags, createdAt, updatedAt }) => {
  const note = await prisma.notes.create({
    data: {
      id,
      title,
      body,
      tags,
      createdAt,
      updatedAt,
    },
  });

  return note.id;
};

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

const editNote = async ({ id, title, body, tags, updatedAt }) => {
  await prisma.notes.update({
    where: {
      id,
    },
    data: {
      title,
      body,
      tags,
      updatedAt,
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