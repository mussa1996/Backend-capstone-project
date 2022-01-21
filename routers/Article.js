const express = require('express');
const router = express.Router();
const multer = require('../config/MulterConfig')
const articleCtrl = require('../controllers/Article')
const auth = require('../middleware/Auth')

router.post('/add',auth,multer,articleCtrl.postArticle);
router.get('/listAll',articleCtrl.getArticles)
router.get('/listOne/:id',articleCtrl.getArticle)
router.patch('/update/:id',auth,multer, articleCtrl.updateArticle)
router.delete('/delete/:id', auth,articleCtrl.deleteArticle)

module.exports = router;