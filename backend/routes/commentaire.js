const express = require('express');
const router = express.Router();
const commentaireCtrl = require('../controllers/commentaire');

router.get('/', commentaireCtrl.getAllCommentaires);

module.exports = router;
