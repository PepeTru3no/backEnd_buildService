import { now } from "sequelize/lib/utils";
import db from "../models/index.js";
import { where } from "sequelize";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import bcrypt from "bcryptjs";
const Users = db.users;
const Op = db.Sequelize.Op;
config();

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

export const createUser = async (req, res) => {
    const user = req.data;
    await Users.create(user)
        .then(data => {
            delete data.password;
            res.status(201).json(data);
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        });
}

export const addStars = async (req, res) => {
    const {id,stars}= req.data;
    Users.update({stars: stars},{where:{id:id}})
    .then(num=>{
        if(num == 1 ){
            res.status(200).json({message:'Estrellas actualizadas'});
        }else{
            res.status(404).json({message:'El registro no existe'});
        }
    })
    .catch(err=>{
        res.status(500).json({message: err.message});
    });
} 

export const login=async (req, res) => {
    const {email, password}= req.data;
    const secret= process.env.SECRET;
    try {
        const  users = await Users.findAll({where:{email:email}});        
        if(!users || !users[0].dataValues.id){
            return res.status(400).json({message: "Usuario inexistente"});    
        }
        const user= users[0].dataValues;
        console.log(user);
        const isLogger = bcrypt.compareSync(password, user.password);   
        if(!isLogger){
            return res.status(400).json({message: "Usuario o contraseña erroneos"});
        }   
        const token = jwt.sign({email}, secret);
        res.json({token, user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}