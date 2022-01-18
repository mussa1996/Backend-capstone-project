const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/Comment')

router.post('/comment/',commentCtrl.addComment )
router.get('/comment/', commentCtrl.getComments)

module.exports = router