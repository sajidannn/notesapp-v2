import { findNotes, createNote, findNoteById, deleteNote, editNote } from './note.repository.js';
import NotFoundError from '../../exception/NotFoundError.js';
import InvariantError from '../../exception/InvariantError.js';

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

export {
  getAllNotes,
  addNote,
  getNoteById,
  deleteNoteById,
  editNoteById
};