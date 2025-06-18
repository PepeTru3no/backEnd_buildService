import { where } from "sequelize";
import db from "../models/index.js";
const Comments = db.comments;
const Users = db.users;
const Op = db.Sequelize.Op;

export const getComments = async (req, res) => {
    const { limit } = req.query;
    const pagination = {
        limit: limit
    }
    try {
        const comments = await Comments.findAll(pagination);
        const response = await Promise.all(
            comments.map(async comment => {
                const user = await Users.findOne({ where: { id: comment.dataValues.user_id } });
                return {
                    id: comment.dataValues.id,
                    comment: comment.dataValues.comment,
                    user: `${user.name} ${user.last_name}`
                };
            }
            )
        );
        res.json(response);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

export const createComment = async (req, res) => {
    await Comments.create(req.data)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        });
}

export const getCommentsByService = async (req, res) => {
    const { id } = req.params;
    try {
        const comments = await Comments.findAll({ where: { service_id: id } });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}