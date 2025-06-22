// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "clave_secreta_temporal";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // <- Aquí se guarda el usuario decodificado
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
};
