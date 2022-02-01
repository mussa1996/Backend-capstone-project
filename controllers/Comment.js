const mongoose = require('mongoose')
const Comments = require('../models/Comment')

exports.addComment = async(req,res)=>{
    try {
        const data = (req.body)
        const comment = new Comments({...data, Article:req.query.id})

        await comment.save()
        res.status(201).send({
            message:'comment added successfully',
            comment
        })
    } catch (error) {
        res.status(404).send(error.message)
    }
}

exports.getComments = async(req,res)=>{
    
      try {
        const comments = await Comments.findOne({Article:req.query.id})
        res.status(201).send({
            message:'operation successful',
            comments
        })
      } catch (error) {
          res.status(404).send(error.message)
      }
}