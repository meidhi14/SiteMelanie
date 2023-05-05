const express = require('express');
const router = express.Router();
const enfantsCtrl = require('../controllers/enfants');

// --- Afficher la liste des enfants en garde
router.get('/', enfantsCtrl.getEnfants);

// --- Ajouter un enfant dans la BD ---
router.post('/', enfantsCtrl.addEnfant);

module.exports = router;
