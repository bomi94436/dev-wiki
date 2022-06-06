import express from 'express';
import { initDatabase } from './model/db';

const app = express();
const port = process.env.PORT || 5001;

initDatabase();

app.get('/', (req, res) => {
  res.status(200).send('hello !');
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
