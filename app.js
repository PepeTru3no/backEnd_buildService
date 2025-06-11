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

app.use(express.json());
app.use(cors());
app.use("/.netlify/functions/services", servicesRoutes);
app.use("/.netlify/functions/users", usersRoutes);
app.use("/.netlify/functions/images", imagesRoutes);
app.use("/.netlify/functions/comments", commentRoutes);
app.use("/.netlify/functions/favorites", favoriteRoutes);
app.use("/.netlify/functions/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
