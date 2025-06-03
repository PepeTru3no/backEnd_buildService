import { where } from "sequelize";
import db from "../models/index.js";
const Images = db.images;
const Op = db.Sequelize.Op;

export const getImages=async(req, res)=>{
    try {
        const serviceId= req.params.id;
        const images = await Images.findAll({where:{service_id:serviceId}});
        res.json(images);
    } catch (error) {
        res.status(500).json({'message':error.message});
    }
}

export const createImage= async(req, res)=>{
    await Images.create(req.body)
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    });
}