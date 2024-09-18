import express from 'express';
import { PORT } from './config/serverConfig.js';
import usersRouter from '../server/routes/usersRoutes.js';
import mongoose from 'mongoose';
import mongoDBURL from './config/dbConfig.js';
import postsRouter from './routes/postsRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';
import passport from 'passport';
import passportStrategy from '../server/utils/passportConfig.js';
import { cloudinaryConfig } from './config/cloudinary.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://instclone-six.vercel.app');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

cloudinaryConfig();

app.use(passport.initialize());
passport.use(passportStrategy);

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log(`App is listening to port:${PORT}`);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
