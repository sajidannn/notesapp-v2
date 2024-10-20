const express = require('express');
const router = express.Router();

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

router.get('/:id', async (req, res) => {
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
    res.status(404).send({
      status: 'error',
      message: error.message,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title = 'untitled', body, tags } = req.body;
    const noteId = await addNote({ title, body, tags });
    res.status(201).send({
      status: 'success',
      message: 'New note created',
      data: { noteId },
    });
  } catch (error) {
    res.status(400).send({
      status: 'error',
      message: error.message,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, body, tags } = req.body;
    await editNoteById({ id: noteId, title, body, tags });
    res.status(200).send({
      status: 'success',
      message: 'Note updated',
    });
  } catch (error) {
    res.status(404).send({
      status: 'error',
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    await deleteNoteById(noteId);
    res.status(204).send({
      status: 'success',
      message: 'Note deleted',
    });
  } catch (error) {
    res.status(404).send({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = router;