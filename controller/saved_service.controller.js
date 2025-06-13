import { where } from "sequelize";
import db from "../models/index.js";
const SavedService = db.saved_service;
const Op = db.Sequelize.Op;

export const getSavedService = async (req, res) => {
    try {
        const { user_id, service_id } = req.query;
        const favorites = await SavedService.findOne({ where: { user_id: user_id, service_id: service_id } });
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

export const deleteSavedService = async (req, res) => {
    const { user_id, service_id } = req.query;
    await SavedService.destroy({ where: { user_id, service_id } })
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