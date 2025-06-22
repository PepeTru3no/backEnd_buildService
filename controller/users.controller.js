import { now } from "sequelize/lib/utils";
import db from "../models/index.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config();

const Users = db.users;
const Images = db.images;
const Op = db.Sequelize.Op;

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    // Para seguridad, no enviar passwords al cliente
    const safeUsers = users.map((user) => {
      const { password, ...rest } = user.dataValues;
      return rest;
    });
    res.json(safeUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const user = req.data;
  try {
    const data = await Users.create(user);
    // No enviar contraseña en la respuesta
    const { password, ...userWithoutPass } = data.dataValues;
    res.status(201).json(userWithoutPass);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addStars = async (req, res) => {
  const { id, stars } = req.data;
  try {
    const [num] = await Users.update({ stars: stars }, { where: { id: id } });
    if (num === 1) {
      res.status(200).json({ message: "Estrellas actualizadas" });
    } else {
      res.status(404).json({ message: "El registro no existe" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, pass } = req.data;
  const secret = process.env.JWT_SECRET;
  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario inexistente" });
    }

    const isLogged = bcrypt.compareSync(pass, user.password);
    if (!isLogged) {
      return res
        .status(400)
        .json({ message: "Usuario o contraseña incorrectos" });
    }
    const image = await Images.findOne({ where: { user_id: user.id } })
    // Firma el token con más datos útiles (puedes agregar id o roles)
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: "1h",
    });

    // No enviar password en respuesta
    const { password, ...userWithoutPass } = user.dataValues;

    res.json({ token, user: userWithoutPass, image });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Users.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const newUser = req.data;
  try {
    const [num] = await Users.update(newUser, { where: { id: id } });
    if (num === 1) {
      res.status(200).json({ message: "Usuario actualizado correctamente" });
    } else {
      res.status(404).json({ message: "El registro no existe" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
