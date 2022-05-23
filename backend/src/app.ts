import express from 'express';
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.status(200).send('hello !');
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
