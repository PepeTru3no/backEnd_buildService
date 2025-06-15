import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { eliminarTildes } from '../util/util.js';
config();
export const createServiceMiddleaware = async (req, res, next) => {
    const { name, description, user_id, category } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization ? Authorization.split("Bearer ")[1] : false;;
    const url = req.url;
    const secret= process.env.SECRET;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);
    try {

        if (!token) {
            return res.status(404).json({ message: 'Usuario no autorizado' });
        }else if(!name.trim() || !description.trim() || isNaN(user_id) || !category.trim()){
            return res.status(400).json({ message: 'Todos los campos deben ser completados' });
        }else if(!jwt.verify(token, secret)){
            return res.status(400).json({ message: 'El token enviado no es valido' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.data={
        name,
        description,
        user_id,
        category:eliminarTildes(category)
    }
    next();
}

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
      const nStars =Number(stars)===0?Number(newStars) :(Number(stars) + Number(newStars)) / 2;
      req.data = {
        id: Number(id),
        stars: nStars,
      };
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const updateServiceMiddleware = async (req, res, next) => {
    const { name, description, user_id, category } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization ? Authorization.split("Bearer ")[1] : false;;
    const url = req.url;
    const secret= process.env.SECRET;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);
    try {

        if (!token) {
            return res.status(404).json({ message: 'Usuario no autorizado' });
        }else if(!name.trim() || !description.trim() || isNaN(user_id) || !category.trim()){
            return res.status(400).json({ message: 'Todos los campos deben ser completados' });
        }else if(!jwt.verify(token, secret)){
            return res.status(400).json({ message: 'El token enviado no es valido' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.data={
        name,
        description,
        user_id,
        category:eliminarTildes(category)
    }
    next();
  }