import db from "../models/index.js";
const Comments = db.comments;
const Op = db.Sequelize.Op;

export const getComments=async(req, res)=>{
    try {
        const comments = await Comments.findAll();
        res.json(comments);
    } catch (error) {
        res.status(500).json({'message':error.message});
    }
}

export const createComment= async(req, res)=>{
    await Comments.create(req.body)
    .then(data=>{
        res.status(200).json(data);
    })
    .catch(err=>{
        res.status(500).json({message: err.message})
    });
}