/* import pkg from 'pg';
import {config} from 'dotenv';

const {Pool}= pkg;
config();

const pool= new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    allowExitOnIdle: true
});

export default pool; */

import { Sequelize } from "sequelize";
import { config } from 'dotenv';
config();
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
},
);

export default sequelize;