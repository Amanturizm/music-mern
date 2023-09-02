import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('*', (_, res) => res.sendStatus(404));

(async () => {
  await mongoose.connect('mongodb://localhost/music-db');

  app.listen(port, () => console.log(`Server running at ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch(e => console.error(e));