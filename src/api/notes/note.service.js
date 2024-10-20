const {
  findNotes,
  createNote,
  findNoteById,
  deleteNote,
  editNote
} = require('./note.repository');

const getAllNotes = async () => {
  const notes = await findNotes();
  return notes;
};

const getNoteById = async (id) => {
  const note = await findNoteById(id);

  if (!note) {
    throw Error('Note not found');
  };

  return note;
};

const addNote = async ({ title, body, tags }) => {
  const note = await createNote({ title, body, tags });

  if (!note) {
    throw Error('Note could not be created');
  }

  return note.id;
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