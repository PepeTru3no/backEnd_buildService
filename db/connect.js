import { Sequelize } from "sequelize";
import { config } from "dotenv";
import pg from "pg";
config();

// Detectar si es conexión local
const isLocalhost = process.env.DB_HOST === "localhost";

// Configurar SSL solo si NO estás en local
const dialectOptions = isLocalhost
  ? "" // sin SSL
  : {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
console.log("DB_HOST =", process.env.DB_HOST);
console.log("SSL activado:", !isLocalhost);
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

export default sequelize;
