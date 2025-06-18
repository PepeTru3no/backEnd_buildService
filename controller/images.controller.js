import { where } from "sequelize";
import db from "../models/index.js";
const Images = db.images;
const Op = db.Sequelize.Op;
import fs from 'fs';

export const getImages = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const images = await Images.findAll({ where: { service_id: serviceId } });
        res.json(images);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

export const createImage = async (req, res) => {
    const files = req.files;
    const service_id = req.params.id;
    if (!files) {
        return res.status(400).json({ message: 'Por favor, elige archivos' });
    }
    try {
        files.forEach(async file => {
            const data = {
                sample_image: file.filename,
                service_id: service_id
            }
            await Images.create(data);
        });
        res.status(201).json({ message: 'archivos guadados correctamente' });
    } catch (error) {
        res.status(500).json({ message: err.message })
    }
}

export const createImageUser = async (req, res) => {
    const file = req.file;
    const user_id = req.params.id;
    if (!file) {
        return res.status(400).json({ message: 'Por favor, elige un archivo' });
    }
    try {
        const userImage= await Images.findOne({where:{user_id:user_id}});
        if(userImage){
            const fileName= userImage.sample_image;
            fs.unlink(`./uploads/${fileName}`,error=>{
                if(error){
                    console.log("Archivo no borrado por: ", error)
                }else{
                    console.log("archivo eliminado de: ", fileName);
                }                
            });
            await Images.destroy({where:{user_id:user_id}});
        }
        const data = {
            sample_image: file.filename,
            user_id: user_id
        }
        const image = await Images.create(data);
        res.status(201).json({ message: 'archivos guadados correctamente', image });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}