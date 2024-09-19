import express from 'express';
import cors from 'cors';
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
const addMiddlewares = () => {
  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  cloudinaryConfig();

  app.use(passport.initialize());

  passport.use(passportStrategy);
};

const addRoutes = () => {
  app.use('/users', usersRouter);
  app.use('/posts', postsRouter);
  app.use('/comments', commentsRouter);
};

const startServer = () => {
  const port = process.env.PORT || 5001;

  app.listen(port, () => {
    console.log('Server is running in port ', port);
  });
};

const connectMongoDB = async () => {
  await mongoose.connect(mongoDBURL);
  console.log('Mongo DB is running');
};
// const connectMongoDb = () => {
//   mongoose
//     .connect(mongoDBURL)
//     .then(() => {
//       console.log(`App is listerning to port:${PORT}`);
//       app.listen(PORT, () => {
//         console.log(`App is listerning to port: ${PORT}`);
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

(async function () {
  addMiddlewares();
  await connectMongoDB();
  addRoutes();
  startServer();
})();
