import { where } from "sequelize";
import db from "../models/index.js";
const SavedService = db.saved_service;
const Op = db.Sequelize.Op;

export const getSavedService = async (req, res) => {
    try {
        const id = req.params.id;
        const favorites = await SavedService.findAll({ where: { user_id: id } });
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

export const createSavedService = async (req, res) => {
    await SavedService.create(req.body)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ 'message': err.message })
        });
}