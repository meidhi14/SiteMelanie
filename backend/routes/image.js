const express = require('express');
const router = express.Router();
const imageCtrl = require('../controllers/image');

// --- Ajouter une image ---
router.post('/', imageCtrl.postImage);

module.exports = router;
