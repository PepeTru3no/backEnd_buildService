import db from "../models/index.js";
const Users = db.users;
const Op = db.Sequelize.Op;

export const getUsers=async(req, res)=>{
    try {
        const users = await Users.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({'message':error.message});
    }
}

export const createUser= async(req, res)=>{
    await Users.create(req.body)
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    });
}