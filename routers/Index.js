const express = require('express')
const router = express.Router();
const articleRoutes = require('./Article')
const userRoutes = require('./User')
const commentRoutes = require('./Comment')
const contactRoutes = require('./Contact')

router.use('/articles',articleRoutes)
router.use('/users',userRoutes)
router.use('/comments',commentRoutes)
router.use('/contacts',contactRoutes)
module.exports=router;