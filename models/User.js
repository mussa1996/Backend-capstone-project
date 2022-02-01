const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config();
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
		unique: true,
		lowercase: true,
		trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    token: {
        type: String,
      },
})
//generating auth token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.MY_SECRET)
    user.token = token
    await user.save();
    return token;
}
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})
   
     if(!user){
         throw new Error()
     }
     const isMatch = await bcrypt.compare(password,user.password)
    //  if(!isMatch){
    //      throw new Error({error:'wrong password'})
    //  }
     return user
}

//hash the plain text password
userSchema.pre('save', async function(next){
   const user = this
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8)
   }
   next()
})
const User = mongoose.model('user',userSchema);

module.exports = User;