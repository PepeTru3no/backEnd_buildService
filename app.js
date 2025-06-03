import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import db from './models/index.js';
import servicesRoutes from './routers/services.router.js';
import usersRoutes from './routers/users.router.js';
import imagesRoutes from './routers/images.router.js';
import commentRoutes from './routers/comments.router.js';
import favoriteRoutes from './routers/saved_service.model.js';

config();
const app= express();
const serverPort = process.env.SERVER_PORT || 3000;
app.use(express.json());
app.use(cors());
app.listen(serverPort, console.log(`run in port ${serverPort}`));
app.use('/services', servicesRoutes);
app.use('/users', usersRoutes);
app.use('/images', imagesRoutes);
app.use('/comments', commentRoutes);
app.use('/favorites', favoriteRoutes);

/* db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
}); */