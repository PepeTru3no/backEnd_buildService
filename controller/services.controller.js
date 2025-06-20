import { where } from "sequelize";
import db from "../models/index.js";
const { services: Services, images: Images, comments: Comments, users: Users, saved_service: SavedService } = db;
const Op = db.Sequelize.Op;

export const getServices = async (req, res) => {
    const { limit, page, order, category, user_id, search } = req.query;
    const offset = page ? (page - 1) * limit : 0;
    const [field, direction] = order ? order.split('_') : 'id_ASC'.split('_');
    const field2= field==="creation"?'creation_date':field;
    let filter = '';
    if (category && search) {
        filter = {
            category: category,
            name: {
                [Op.iLike]: `${search}%`
            }
        }
    } else if (category && !search) {
        filter = {
            category: category
        }
    } else if (!category && search) {
        filter = {
            name: {
                [Op.iLike]: `${search}%`
            }
        }
    }

    const pagination = {
        where: filter,
        limit: limit || 5, // Número de registros por página
        offset: offset, // Desplazamiento
        order: [[field2, direction]],
    }
    try {
        const { rows: services, count } = await Services.findAndCountAll(pagination);
        let response = await Promise.all(
            services.map(async service => {
                const imgs = await Images.findAll({ where: { service_id: service.dataValues.id } });
                const user = await Users.findOne({ where: { id: service.dataValues.user_id } });
                const fav = user_id ? await SavedService.findOne({ where: { user_id: user_id, service_id: service.dataValues.id } }) : false;
                return {
                    id: service.dataValues.id,
                    name: service.dataValues.name,
                    description: service.dataValues.description,
                    stars: service.dataValues.stars,
                    price: service.dataValues.price,
                    creation_date:service.dataValues.creation_date,
                    isFav: !!fav,
                    category: service.dataValues.category,
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
        const commentAndUser = await Promise.all(
            comments.map(async comm => {
                const comment = comm.dataValues;
                const user = await Users.findOne({ where: { id: comment.user_id } });
                return {
                    comment,
                    user
                }
            })
        );
        const response = {
            id: id,
            name: service.name,
            description: service.description,
            stars: service.stars,
            category: service.category,
            price: service.price,
            creation_date:service.creation_date,
            images: imgs.map(img => img.dataValues),
            comments: commentAndUser
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

};

export const addStars = async (req, res) => {
    const { id, stars } = req.data;
    try {
        const [num] = await Services.update({ stars: stars }, { where: { id: id } });
        if (num === 1) {
            res.status(200).json({ message: "Estrellas actualizadas", stars: stars });
        } else {
            res.status(404).json({ message: "El registro no existe" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getServiceByUserId = async (req, res) => {
    const { user_id } = req.query;
    console.log(user_id)
    await Services.findAll({ where: { user_id: user_id } })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Usuario sin servicios creados' });
            }
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

export const getFavServById = async (req, res) => {
    console.log(req.query);
    const { user_id } = req.query;
    try {
        const { rows: favs, count } = await SavedService.findAndCountAll({ where: { user_id: user_id } });
        let response = await Promise.all(
            favs.map(async fav => {
                const service = await Services.findOne({ where: { id: fav.dataValues.service_id } });
                return service;
            })
        );
        res.status(200).json(response, count);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteService = async (req, res) => {
    const { user_id, service_id } = req.query;
    await Services.destroy({ where: { user_id, id: service_id } })
        .then(data => {
            if (data != 1) {
                return res.status(404).json({ message: 'el registro no existe' })
            }
            res.status(200).json({ message: 'eliminado' })
        })
        .catch(err => {
            res.status(500).json({ 'message': err.message })
        });
}

export const updateService = async (req, res) => {
    const { id } = req.params;
    const { name, description, user_id, category, price } = req.data;
    try {
        const [num] = await Services.update({ name: name, description: description, category: category, price:price }, { where: { id: id, user_id: user_id } });
        if (num === 1) {
            res.status(200).json({ message: "servivio actualizadas correctamente" });
        } else {
            res.status(404).json({ message: "El registro no existe" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}