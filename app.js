// app.js
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import servicesRoutes from "./routers/services.router.js";
import usersRoutes from "./routers/users.router.js";
import imagesRoutes from "./routers/images.router.js";
import commentRoutes from "./routers/comments.router.js";
import favoriteRoutes from "./routers/saved_service.model.js";
import bodyParser from "body-parser";

config();

const app = express();
let prefixNetlify='';

app.use(express.json());
app.use(cors());
if(process.env.NETLIFY){
    prefixNetlify='/.netlify/functions';
}

app.use(`${prefixNetlify}/.netlify/functions/services`, servicesRoutes);
app.use(`${prefixNetlify}/.netlify/functions/users`, usersRoutes);
app.use(`${prefixNetlify}/.netlify/functions/images`, imagesRoutes);
app.use(`${prefixNetlify}/.netlify/functions/comments`, commentRoutes);
app.use(`${prefixNetlify}/.netlify/functions/favorites`, favoriteRoutes);
app.use(`${prefixNetlify}/.netlify/functions/uploads`, express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
