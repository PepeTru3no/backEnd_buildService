import { where } from "sequelize";
import db from "../models/index.js";
const { services: Services, images: Images, comments: Comments } = db;
const Op = db.Sequelize.Op;

export const getServices = async (req, res) => {
    try {
        const services = await Services.findAll();
        const response = await Promise.all(
            services.map(async service => {
                const imgs = await Images.findAll({ where: { service_id: service.dataValues.id } });
                return {
                    id: service.dataValues.id,
                    name: service.dataValues.name,
                    description: service.dataValues.description,
                    images: imgs.map(img => img.dataValues)
                };
            })
        );
        res.json(response);
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
        if(!service){
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