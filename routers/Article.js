const express = require('express');
const router = express.Router();
const multer = require('../config/MulterConfig')
const articleCtrl = require('../controllers/Article')
const auth = require('../middleware/Auth')

router.post('/add',auth,multer,articleCtrl.postArticle);
router.get('/listAll',articleCtrl.getArticles)
router.get('/listOne/',articleCtrl.getArticle)
router.patch('/update/',auth,multer, articleCtrl.updateArticle)
router.delete('/delete/', auth,articleCtrl.deleteArticle)

module.exports = router;