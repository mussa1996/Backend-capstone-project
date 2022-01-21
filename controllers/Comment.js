const mongoose = require('mongoose')
const Comments = require('../models/Comment')

exports.addComment = async(req,res)=>{
    try {
        const data = (req.body)
        const comment = new Comments({...data, Article:req.query.id})

        await comment.save()
        res.status(200).send(comment)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getComments = async(req,res)=>{
    
        const comments = await Comments.findOne({Article:req.query.id})
        res.status(200).send(comments)
}