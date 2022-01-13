const express = require('express')
const router = express.Router();
const articleRoutes = require('./Article')
const userRoutes = require('./User')
const commentRoutes = require('./Comment')
const contactRoutes = require('./Contact')

router.use('/articles',articleRoutes)
router.use('/user',userRoutes)
router.use('/comments',commentRoutes)
router.use('/contact',contactRoutes)
module.exports=router;