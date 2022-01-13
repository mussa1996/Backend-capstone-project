const Contact = require('../models/Contact')

exports.sendMessage = async(req,res)=>{
    try {
        const message = req.body
        const contact = new Contact({...message})
        await contact.save()
        res.status(200).send("message sent successful")
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}

exports.getMessages = async(req,res)=>{
 
        const messages = await Contact.find({})
        res.send(messages)
 }