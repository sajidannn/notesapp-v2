const express = require('express');
const router = express.Router();
const NotesValidator = require('../../validator/notes');

const {
  getAllNotes,
  addNote,
  getNoteById,
  deleteNoteById,
  editNoteById
} = require('./note.service');

router.get('/', async (req, res) => {
  const notes = await getAllNotes();
  res.send({
    status: 'success',
    data: {
      notes,
    },
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const noteId = req.params.id;
    const note = await getNoteById(noteId);
    res.send({
      status: 'success',
      data: {
        note,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    NotesValidator.validateNotePayload(req.body);

    const { title = 'untitled', body, tags } = req.body;
    const noteId = await addNote({ title, body, tags });
    res.status(201).send({
      status: 'success',
      message: 'New note created',
      data: { noteId },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', validateRequest('PUT'), updateNote);

router.patch('/:id', validateRequest('PATCH'), updateNote);

function validateRequest(method) {
  return (req, res, next) => {
    if (method === 'PUT') {
      NotesValidator.validateNotePayload(req.body);
    } else if (method === 'PATCH') {
      NotesValidator.validateNotePatchPayload(req.body);
    }
    next();
  };
}

async function updateNote(req, res, next) {
  try {
    const noteId = req.params.id;
    const { title, body, tags } = req.body;
    await editNoteById({ id: noteId, title, body, tags });

    res.status(200).send({
      status: 'success',
      message: 'Note updated',
    });
  } catch (error) {
    next(error);
  }
}

router.delete('/:id', async (req, res, next) => {
  try {
    const noteId = req.params.id;
    await deleteNoteById(noteId);
    res.status(204).send({
      status: 'success',
      message: 'Note deleted',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;