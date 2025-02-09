import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import mongoDBURL from './config/dbConfig.js';
import postsRouter from './routes/postsRoutes.js';
import commentsRouter from './routes/commentsRoutes.js';
import passport from 'passport';
import passportStrategy from '../server/utils/passportConfig.js';
import { cloudinaryConfig } from './config/cloudinary.js';
import usersRouter from './routes/usersRoutes.js';
import { initWebSocket } from './utils/websocket.js';
import http from 'http';
const app = express();
const server = http.createServer(app);
initWebSocket(server);

const addMiddlewares = () => {
  app.use(
    cors({
      origin: [
        'http://localhost:3000',
        'https://instclone-client.onrender.com',
      ],
      credentials: true,
    })
  );
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://instclone-client.onrender.com'
      // 'http://localhost:3000'
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
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
  server.listen(port, () => {
    console.log('Server is running in port ', port);
  });
};

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoDBURL);
    console.log('MongoDB is running');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

(async function () {
  addMiddlewares();
  await connectMongoDB();
  addRoutes();
  startServer();
})();
