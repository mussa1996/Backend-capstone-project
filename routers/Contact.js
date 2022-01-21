const express = require('express')
const router = express.Router()
const auth = require('../middleware/Auth')
const contactCtrl = require('../controllers/Contact')

router.post('/send',contactCtrl.sendMessage)
router.get('/list',contactCtrl.getMessages)

module.exports = router