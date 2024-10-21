const {
  findNotes,
  createNote,
  findNoteById,
  deleteNote,
  editNote
} = require('./note.repository');

const NotFoundError = require('../../exception/NotFoundError');
const InvariantError = require('../../exception/InvariantError');

const getAllNotes = async () => {
  const notes = await findNotes();
  return notes;
};

const getNoteById = async (id) => {
  const note = await findNoteById(id);

  if (!note) {
    throw new NotFoundError('Note not found');
  };

  return note;
};

const addNote = async ({ title, body, tags }) => {
  const noteId = await createNote({ title, body, tags });

  if (!noteId) {
    throw new InvariantError('Note could not be created');
  }

  return noteId;
};

const editNoteById = async ({ id, title, body, tags }) => {
  await getNoteById(id);
  await editNote({ id, title, body, tags });
};

const deleteNoteById = async (id) => {
  await getNoteById(id);
  await deleteNote(id);
};

module.exports = {
  getAllNotes,
  addNote,
  getNoteById,
  deleteNoteById,
  editNoteById
};