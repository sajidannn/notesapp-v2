import { findNotes, createNote, findNoteById, deleteNote, editNote } from './note.repository.js';
import { nanoid } from 'nanoid';
import NotFoundError from '../../exception/NotFoundError.js';
import InvariantError from '../../exception/InvariantError.js';

const addNote = async ({ title, body, tags }) => {
  const id = `note-${nanoid(16)}`;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const noteId = await createNote({ id, title, body, tags, createdAt, updatedAt });

  if (!noteId) {
    throw new InvariantError('Note could not be created');
  }

  return noteId;
};

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

const editNoteById = async ({ id, title, body, tags }) => {
  const updatedAt = new Date().toISOString();
  await getNoteById(id);
  await editNote({ id, title, body, tags, updatedAt });
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