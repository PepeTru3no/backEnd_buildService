import Sequelize from "sequelize";
import sequelize from "../db/connect.js";
import { Services } from "./services.model.js";
import { Users } from "./users.model.js";

const db={};

db.Sequelize= Sequelize;
db.sequelize= sequelize;
db.services=Services(sequelize,Sequelize);
db.users=Users(sequelize,Sequelize);

export default db;