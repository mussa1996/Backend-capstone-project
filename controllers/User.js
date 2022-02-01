const mongoose = require('mongoose')
const User = require('../models/User')

exports.createUser = async(req,res)=>{
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    }) 
    try {
       const data = await user.save()
    //    const token = await user.generateAuthToken()
       res.status(201).send({
           message:"created successfully",
           user: data,
        //    token:token
       })
    } catch (error) {
        res.status(404).send(error.message)
    }

}

exports.loginUser = async(req,res)=>{
   try {
       const user = await User.findByCredentials(req.body.email, req.body.password)
       const token = await user.generateAuthToken()

       res.status(201).send({
        message:'operation successful',
           user})
   } catch (error) {
       res.status(404).send(
           error.message
       )
   }
}

exports.getUSer = async(req,res)=>{
    try {
        const user = await User.findById(req.query.id)
      res.status(201).send({
            message:'operation successful',
            user
      })
    } catch (error) {
        
        res.status(404).send(
            error.message
        )
       
    }
}
exports.getAllUser= async(req,res)=>{
    try {
        const users = await User.find({})
    res.status(201).send({
        message:'operation successful',
        users
    })
    } catch (error) {
        res.status(404).send(
            error.message
        )
    }
}


exports.deleteUser =async (req,res)=>{
    try{
    await User.deleteOne({_id:req.query.id})
    return res.status(201).json("delete successfully")
    }catch(error){
    return res.status(404).send(error.message)
    }
}
exports.logout = async(req,res)=>{
    try {
        const {token}=req;
        const userId=req.user._id.toString()
        const users = await User.findOne({_id:userId})
        .then(() => {
            res.status(201).send({
                message: 'logged out successfully',
            })})
            await User.findByIdAndUpdate(req.user._id,{token:null})
        .catch((error) => {
            return res.status(400).json({
                error: error,
                
            });
        })
        if(users.token !== token){
          return  res.status(404).send({
            message: 'Token not found',
        })
        }
    } catch (error) {
        return res.status(500).send()
    }
}