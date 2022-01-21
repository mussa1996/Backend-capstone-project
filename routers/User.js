const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User')
const auth = require('../middleware/Auth')
router.post('/create',userCtrl.createUser)
router.post('/login',userCtrl.loginUser)
router.post('/logout',auth,userCtrl.logout)
router.get('/me',auth,userCtrl.getUSer)
module.exports = router;