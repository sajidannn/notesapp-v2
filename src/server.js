import express, { json } from 'express';
import { config } from 'dotenv';

import notesRouter from './api/notes/note.controller.js';
import userRouter from './api/users/user.controller.js';
import ClientError from './exception/ClientError.js';

config();

const app = express();
const port = process.env.PORT;

//middleware
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

//routes
app.use('/notes', notesRouter);
app.use('/users', userRouter);


//error handling
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