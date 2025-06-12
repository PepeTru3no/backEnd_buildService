import { Sequelize } from "sequelize";
import { config } from 'dotenv';
import pg from 'pg';
config();
let dialectOptions = {
    ssl: {
        require: true,
        rejectUnauthorized: false,
    },
}

if(process.env.DB_HOST === "localhost"){
    dialectOptions='';
}

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectModule: pg, //especifica pg a utilizar
    dialectOptions, 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
},
);

export default sequelize;