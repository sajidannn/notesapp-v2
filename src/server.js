const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

const notesRouter = require('./api/notes/note.controller');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/notes', notesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});