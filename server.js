// server.js
import app from "./app.js";
import db from "./models/index.js";
import { genAuthUrl } from "./util/generateAuthorizationUrl.js";
import { oAuth2Callback } from "./util/generateRefreshToken.js";

  db.sequelize
  .sync({ alter: true }) // o force: false
  .then(() => console.log("Base de datos sincronizada con notificaciones"))
  .catch((err) => console.error("Error al sincronizar la base de datos:", err)); 

const PORT = process.env.SERVER_PORT || 3000;

const servidor = process.env.RENDER
  ? "correindo desde RENDER"
  : "corriendo en LOCAL";

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get("/", (req, res) => {
  res.json({ message: `Bienvenido al servicio, ${servidor}` });
});

app.get('/genAuthUrl', genAuthUrl);
app.get('/oauth2callback', oAuth2Callback);
