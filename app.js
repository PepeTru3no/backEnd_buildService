import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import db from './models/index.js';
import servicesRoutes from './routers/services.router.js';
import usersRoutes from './routers/users.router.js';
import imagesRoutes from './routers/images.router.js';
import commentRoutes from './routers/comments.router.js';
import favoriteRoutes from './routers/saved_service.model.js';
import multer from 'multer';
import bodyParser from 'body-parser';

config();
const app = express();
const serverPort = process.env.SERVER_PORT || 3000;
app.use(express.json());
app.use(cors());
app.listen(serverPort, console.log(`run in port ${serverPort}`));
app.use('/services', servicesRoutes);
app.use('/users', usersRoutes);
app.use('/images', imagesRoutes);
app.use('/comments', commentRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/uploads', express.static('uploads')); // Servir imágenes
app.use(bodyParser.urlencoded({extended: true}))

export default app;