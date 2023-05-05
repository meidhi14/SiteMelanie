const express = require('express');
const router = express.Router();
const nourriceCtrl = require('../controllers/nourrice');

// --- Récuperer les information de la nourrice ---
router.get('/', nourriceCtrl.getNourrice);
