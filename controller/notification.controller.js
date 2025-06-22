// controller/notification.controller.js
import db from "../models/index.js";

const Notifications = db.notifications;

export const getNotificationsByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const notifications = await Notifications.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    await Notifications.update({ seen: true }, { where: { userId } });
    res.status(200).json({ message: "Notificaciones marcadas como leídas" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
