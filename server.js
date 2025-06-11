// server.js
import app from "./app.js";
import serverless from 'serverless-http'

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export const handler= serverless(app);