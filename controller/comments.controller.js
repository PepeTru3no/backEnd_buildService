// controller/comments.controller.js
import db from "../models/index.js";

const Comments = db.comments;
const Users = db.users;
const Services = db.services;
const Notifications = db.notifications;

export const getComments = async (req, res) => {
  const { limit } = req.query;
  try {
    const comments = await Comments.findAll({ limit });
    const response = await Promise.all(
      comments.map(async (comment) => {
        const user = await Users.findOne({
          where: { id: comment.dataValues.user_id },
        });
        return {
          id: comment.dataValues.id,
          comment: comment.dataValues.comment,
          user: `${user.name} ${user.last_name}`,
        };
      })
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const comment = await Comments.create(req.body); // Usa req.body

    const serviceId = req.body.service_id;
    const service = await Services.findByPk(serviceId);

    if (service && service.userId !== req.user.id) {
      await Notifications.create({
        userId: service.userId,
        message: `Nuevo comentario en tu servicio "${service.title}"`,
        seen: false,
      });
    }

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCommentsByService = async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await Comments.findAll({ where: { service_id: id } });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
