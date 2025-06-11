import Sequelize from "sequelize";
import sequelize from "../db/connect.js";
import { Services } from "./services.model.js";
import { Users } from "./users.model.js";
import { Comments } from "./comments.model.js";
import { Images } from "./images.model.js";
import { SavedService } from "./saved_service.model.js";

const db={};
db.Sequelize= Sequelize;
db.sequelize= sequelize;
db.services=Services(Sequelize);
db.users=Users(sequelize,Sequelize);
db.comments= Comments(sequelize, Sequelize);
db.images= Images(sequelize,Sequelize);
db.saved_service= SavedService(sequelize,Sequelize);

export default db;