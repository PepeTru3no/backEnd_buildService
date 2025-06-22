import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../db/connect.js";
import { Services } from "./services.model.js";
import { Users } from "./users.model.js";
import { Comments } from "./comments.model.js";
import { Images } from "./images.model.js";
import { SavedService } from "./saved_service.model.js";
import NotificationModel from "./notification.model.js"; // ✅ nuevo import

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.services = Services(sequelize, DataTypes);
db.users = Users(sequelize, DataTypes);
db.comments = Comments(sequelize, DataTypes);
db.images = Images(sequelize, DataTypes);
db.saved_service = SavedService(sequelize, DataTypes);
db.notifications = NotificationModel(sequelize, DataTypes);

export default db;
