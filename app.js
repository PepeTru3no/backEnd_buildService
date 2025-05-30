import express from 'express';
import cors from 'cors';
import {config} from 'dotenv';
import db from './models/index.js';
import servicesRoutes from './routers/services.router.js';

config();
const app= express();
const serverPort = process.env.SERVER_PORT || 3000;
app.use(express.json());
app.use(cors());
app.listen(serverPort, console.log(`run in port ${serverPort}`));
app.use('/services', servicesRoutes);

/* db.sequelize.sync()
.then(() => {
  console.log("Synced db.");
})
.catch((err) => {
  console.log("Failed to sync db: " + err.message);
}); */