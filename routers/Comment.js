const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/Comment')

router.post('/comment/:id',commentCtrl.addComment )
router.get('/comment/:id', commentCtrl.getComments)

module.exports = router