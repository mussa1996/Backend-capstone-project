const express = require('express');
const router = express.Router();
const multer = require('../config/MulterConfig')
const articleCtrl = require('../controllers/Article')
const auth = require('../middleware/Auth')

router.post('/add',multer,articleCtrl.postArticle);
router.get('/listAll',articleCtrl.getArticles)
router.get('/listOne/:id',articleCtrl.getArticle)
router.patch('/update/:id',multer, articleCtrl.updateArticle)
router.delete('/delete/:id',auth, articleCtrl.deleteArticle)

module.exports = router;