import express from "express";
import cors from "cors";
import { config } from "dotenv";
import servicesRoutes from "./routers/services.router.js";
import usersRoutes from "./routers/users.router.js";
import imagesRoutes from "./routers/images.router.js";
import commentRoutes from "./routers/comments.router.js";
import favoriteRoutes from "./routers/saved_service.router.js";
import notificationRouter from "./routers/notification.router.js";
import bodyParser from "body-parser";

config();

const app = express();
let prefixNetlify = "";

app.use(express.json());
app.use(cors());

if (process.env.NETLIFY) {
  prefixNetlify = "/.netlify/functions";
}

app.use(`${prefixNetlify}/services`, servicesRoutes);
app.use(`${prefixNetlify}/users`, usersRoutes);
app.use(`${prefixNetlify}/images`, imagesRoutes);
app.use(`${prefixNetlify}/comments`, commentRoutes);
app.use(`${prefixNetlify}/favorites`, favoriteRoutes);
app.use(`${prefixNetlify}/notifications`, notificationRouter); // ✅
app.use(`${prefixNetlify}/uploads`, express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));

export default app;
