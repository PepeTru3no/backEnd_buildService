import { now } from "sequelize/lib/utils";
import bcrypt from 'bcryptjs';
const emailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const addStratMiddleware = async (req, res, next) => {
    const { stars, newStars } = req.body;
    let nStars;
    const id = req.params.id;
    const url = req.url;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);

    try {
        if (isNaN(stars) || isNaN(newStars) || isNaN(id)) {
            return res.status(400).json({ message: "Todos os campos son requerido y deben ser numericos" });
        }
        nStars = (stars + newStars) / 2;
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.data = {
        id,
        stars,
        newStars
    }
    next();
}

export const loginMiddleware = async (req, res, next) => {
    const { email, password } = req.body;
    const url = req.url;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);
    try {
        if (!email.trim() || !password.trim()) {
            return res.status(400).json({ message: "Los campos no deben estar vacios" });
        } else if (!emailFormat.test(email)) {
            return res.status(400).json({ message: 'El formato de correo es erroneo' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    req.data = {
        email,
        password
    };
    next();
}

export const registerMiddleware = async (req, res, next) => {
    const date = now();
    const { name, last_name, email, age, password, phone } = req.body;
    const url = req.url;
    let passCrypt;
    let state;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);
    try {
        if (!name.trim() || !last_name.trim() || !email.trim() || !password.trim() || !phone.trim()) {
            return res.status(404).json({ message: 'Los campos deben estar completos' });
        } else if (isNaN(age)) {
            return res.status(404).json({ message: 'La edad debe ser numerica' });
        } else if (age < 18) {
            return res.status(404).json({ message: 'Para ingresar debe ser mayor de edad' });
        } else if (!emailFormat.test(email)) {
            return res.status(404).json({ message: 'El correo no posee en formato correcto' });
        }
        passCrypt = bcrypt.hashSync(password);
        state = 'activo';

    } catch (error) {
        return res.status(500).json({origin:"middleware", message: error.message });
    }

    req.data = {
        name,
        last_name,
        email,
        age,
        username:name+last_name,
        password: passCrypt,
        phone,
        state,
        registration_date: date
    };
    next();
}