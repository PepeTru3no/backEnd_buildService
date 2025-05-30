import db from "../models/index.js";
const Services = db.services;
const Op = db.Sequelize.Op;

export const getServices=async(req, res)=>{
    try {
        const services = await Services.findAll({
            attributes:['id','name','description', 'user_id']
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({'message':error.message});
    }
}