import express from 'express';
import cors from 'cors';
import { PORT } from './config/serverConfig.js';
import usersRouter from '../server/routes/usersRoutes.js';
import mongoose from 'mongoose';
import mongoDBURL from './config/dbConfig.js';
import postsRouter from './routes/postsRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App is listerning to port:${PORT}`);
    app.listen(PORT, () => {
      console.log(`App is listerning to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
