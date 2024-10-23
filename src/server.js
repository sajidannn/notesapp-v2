import express, { json } from 'express';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT;

import notesRouter from './api/notes/note.controller.js';
import ClientError from './exception/ClientError.js';

app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/notes', notesRouter);

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    return res.status(err.statusCode || 400).json({
      status: 'fail',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});