import { now } from "sequelize/lib/utils";
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config();

const Users = db.users;
const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Middleware functions
export const addStratMiddleware = async (req, res, next) => {
  const { stars, newStars } = req.body;
  const id = req.params.id;
  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${
      req.url
    }; Datos recibidas:`,
    req.body
  );

  try {
    if (
      stars === undefined ||
      newStars === undefined ||
      id === undefined ||
      isNaN(Number(stars)) ||
      isNaN(Number(newStars)) ||
      isNaN(Number(id))
    ) {
      return res
        .status(400)
        .json({
          message: "Todos los campos son requeridos y deben ser numéricos",
        });
    }
    const nStars = (Number(stars) + Number(newStars)) / 2;
    req.data = { id: Number(id), stars: nStars };
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${
      req.url
    }; Datos recibidas:`,
    req.body
  );

  try {
    if (
      !email ||
      typeof email !== "string" ||
      !email.trim() ||
      !password ||
      typeof password !== "string" ||
      !password.trim()
    ) {
      return res
        .status(400)
        .json({ message: "Los campos no deben estar vacíos" });
    }
    if (!emailFormat.test(email)) {
      return res
        .status(400)
        .json({ message: "El formato de correo es erróneo" });
    }

    req.data = { email, password };
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerMiddleware = async (req, res, next) => {
  const date = now();
  const { name, last_name, email, age, password, phone, username } = req.body;
  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${
      req.url
    }; Datos recibidas:`,
    req.body
  );

  try {
    if (
      !name ||
      typeof name !== "string" ||
      !name.trim() ||
      !last_name ||
      typeof last_name !== "string" ||
      !last_name.trim() ||
      !email ||
      typeof email !== "string" ||
      !email.trim() ||
      !password ||
      typeof password !== "string" ||
      !password.trim() ||
      !phone ||
      typeof phone !== "string" ||
      !phone.trim()
    ) {
      return res
        .status(400)
        .json({
          message: "Los campos deben estar completos y ser texto válido",
        });
    }
    if (isNaN(Number(age))) {
      return res.status(400).json({ message: "La edad debe ser numérica" });
    }
    if (Number(age) < 18) {
      return res
        .status(400)
        .json({ message: "Para ingresar debe ser mayor de edad" });
    }
    if (!emailFormat.test(email)) {
      return res
        .status(400)
        .json({ message: "El correo no posee un formato correcto" });
    }

    const passCrypt = bcrypt.hashSync(password);
    const state = "activo";
    const userNameFinal =
      username && typeof username === "string" && username.trim()
        ? username.trim()
        : `${name.trim()}${last_name.trim()}`;

    req.data = {
      name: name.trim(),
      last_name: last_name.trim(),
      email: email.trim(),
      age: Number(age),
      username: userNameFinal,
      password: passCrypt,
      phone: phone.trim(),
      state,
      registration_date: date,
    };

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ origin: "middleware", message: error.message });
  }
};

// Controller functions
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    const safeUsers = users.map((u) => {
      const { password, ...rest } = u.dataValues;
      return rest;
    });
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const data = await Users.create(req.data);
    const { password, ...userWithoutPass } = data.dataValues;
    res.status(201).json(userWithoutPass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addStars = async (req, res) => {
  try {
    const [updatedCount] = await Users.update(
      { stars: req.data.stars },
      { where: { id: req.data.id } }
    );
    if (updatedCount === 1) {
      res.status(200).json({ message: "Estrellas actualizadas" });
    } else {
      res.status(404).json({ message: "El registro no existe" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.data;
  const secret = process.env.SECRET;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario inexistente" });
    }
    const isLogged = bcrypt.compareSync(password, user.password);
    if (!isLogged) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });
    const { password: pass, ...userWithoutPass } = user.dataValues;
    res.json({ token, user: userWithoutPass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await Users.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Corrección
expect(body.message).toEqual("Para ingresar debe ser mayor de edad");
