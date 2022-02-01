const Contact = require('../models/Contact')

exports.sendMessage = async(req,res)=>{
    try {
        const message = req.body
        const contact = new Contact({...message})
        await contact.save()
        res.status(201).send({
            message:'message sent successfully',
            contact
        })
    } catch (error) {
        res.status(404).send({message:error.message})
    }
}

exports.getMessages = async(req,res)=>{
 
       try {
        const messages = await Contact.find({})
        res.status(201).send({
            message:'operation successful',
            messages
        })
       } catch (error) {
           res.status(404).send(error.message)
       }
 }