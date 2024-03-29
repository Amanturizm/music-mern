import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import artistsRouter from './routers/artists';
import albumsRouter from './routers/albums';
import tracksRouter from './routers/tracks';
import trackHistoryRouter from './routers/track_history';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/artists', artistsRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', tracksRouter);
app.use('/track_history', trackHistoryRouter);

app.get('*', (_, res) => res.sendStatus(404));

(async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => console.log(`Server running at ${port} port...`));

  process.on('exit', () => {
    mongoose.disconnect();
  });
})().catch((e) => console.error(e));
