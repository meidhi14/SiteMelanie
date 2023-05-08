const express = require('express');
const router = express.Router();
const nourriceCtrl = require('../controllers/nourrice');

// --- Récuperer les information de la nourrice ---
router.get('/', nourriceCtrl.getNourrice);

// --- Ajouter un compte nourrice ---
router.post('/', nourriceCtrl.createNourrice);

// --- Modifier la présentation de la nourrice
router.put('/:idNourrice', nourriceCtrl.modifyNourrice);

module.exports = router;
