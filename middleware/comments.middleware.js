import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const createCommentMiddleware = async (req, res, next) => {
    const { comment, user_id, service_id } = req.body;
    const Authorization = req.header("Authorization");
    const token = Authorization ? Authorization.split("Bearer ")[1] : false;
    const url = req.url;
    const secret = process.env.SECRET;
    console.log(`Fecha de la consulta: ${new Date()}; URL consultada: ${url}; Datos recibidas: `, req.body);
    try {

        if (!token) {
            return res.status(404).json({ message: 'Usuario no autorizado' });
        } else if (!comment.trim() || isNaN(service_id) || isNaN(user_id)) {
            return res.status(400).json({ message: 'Todos los campos deben ser completados' });
        } else if (!jwt.verify(token, secret)) {
            return res.status(400).json({ message: 'El token enviado no es valido' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.data = {
        comment,
        user_id,
        service_id
    }
    next();
}