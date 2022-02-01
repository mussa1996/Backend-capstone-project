const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User')
const auth = require('../middleware/Auth')
router.post('/create',userCtrl.createUser)
router.post('/login',userCtrl.loginUser)
router.delete('/delete',auth,userCtrl.deleteUser)
router.post('/logout',auth,userCtrl.logout)
router.get('/user/',auth,userCtrl.getUSer)
router.get('/listUsers',auth,userCtrl.getAllUser)
module.exports = router;