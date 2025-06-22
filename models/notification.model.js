// models/notification.js
export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define("notifications", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Notifications;
};
