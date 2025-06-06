import { where } from "sequelize";
import db from "../models/index.js";
const { services: Services, images: Images, comments: Comments, users: Users } = db;
const Op = db.Sequelize.Op;

export const getServices = async (req, res) => {
    const { limit, page, order } = req.query;
    const offset = page ? (page - 1) * limit : 0;
    const [field, direction] = order ? order.split('_') : 'id_ASC'.split('_');
    const pagination = {
        limit: limit, // Número de registros por página
        offset: offset, // Desplazamiento
        order: [[field, direction]],
    }
    try {
        const { rows: services, count } = await Services.findAndCountAll(pagination);
        let response = await Promise.all(
            services.map(async service => {
                const imgs = await Images.findAll({ where: { service_id: service.dataValues.id } });
                const user = await Users.findOne({ where: { id: service.dataValues.user_id } });
                return {
                    id: service.dataValues.id,
                    name: service.dataValues.name,
                    description: service.dataValues.description,
                    images: imgs.map(img => img.dataValues),
                    user: user
                };
            })
        );
        res.json({ response, count });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

export const createService = async (req, res) => {
    await Services.create(req.data)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        });
}

export const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Services.findOne({ where: { id: id } })
        if (!service) {
            return res.status(400).json({ message: 'servicio no encontrado' });
        }
        const imgs = await Images.findAll({ where: { service_id: id } });
        const comments = await Comments.findAll({ where: { service_id: id } });
        const response = {
            id: id,
            name: service.name,
            description: service.description,
            images: imgs.map(img => img.dataValues),
            comments: comments.map(comm => comm.dataValues)
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};