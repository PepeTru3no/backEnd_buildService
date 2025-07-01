import { now } from "sequelize/lib/utils";
import bcrypt from "bcryptjs";

const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const addStratMiddleware = async (req, res, next) => {
  const { stars, newStars } = req.body;
  const id = req.params.id;
  const url = req.url;
  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `,
    req.body
  );

  try {
    if (isNaN(Number(stars)) || isNaN(Number(newStars)) || isNaN(Number(id))) {
      return res
        .status(400)
        .json({
          message: "Todos los campos son requeridos y deben ser numéricos",
        });
    }
    const nStars = (Number(stars) + Number(newStars)) / 2;
    req.data = {
      id: Number(id),
      stars: nStars,
    };
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const url = req.url;
  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `,
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

    req.data = {
      email,
      pass:password,
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerMiddleware = async (req, res, next) => {
  const date = now();
  const { name, last_name, email, age, password, phone, username } = req.body;
  const url = req.url;
  let passCrypt;
  let state;

  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `,
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
      !phone.trim()||
      !username ||
      typeof username !== "string" ||
      !username.trim()
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

    passCrypt = bcrypt.hashSync(password);
    state = "inactivo";

    req.data = {
      name,
      last_name,
      email,
      age: Number(age),
      username,
      password: passCrypt,
      phone,
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

export const updateMiddleware = async (req, res, next) => {
  const date = now();
  const { name, last_name, email, age, password, phone, username } = req.body;
  const url = req.url;
  let passCrypt;
  let state;

  console.log(
    `Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `,
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
      !phone ||
      typeof phone !== "string" ||
      !phone.trim()||
      !username ||
      typeof username !== "string" ||
      !username.trim()
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
    
    
    state = "activo";
    if(password){
      passCrypt = bcrypt.hashSync(password);
      req.data = {
        name,
        last_name,
        email,
        age: Number(age),
        username,
        password: passCrypt,
        phone,
        state,
      };
    }else{
      req.data = {
        name,
        last_name,
        email,
        age: Number(age),
        username,
        phone,
        state,
      };
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ origin: "middleware", message: error.message });
  }
};