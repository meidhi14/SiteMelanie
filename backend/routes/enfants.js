const express = require('express');
const router = express.Router();
const enfantsCtrl = require('../controllers/enfants');

// --- Afficher la liste des enfants en garde
router.get('/', enfantsCtrl.getEnfants);

// --- Ajouter un enfant ---
router.post('/', enfantsCtrl.createEnfant);

// --- Afficher la page de l'enfant ---
router.get('/:id', enfantsCtrl.getOneEnfant);

// --- Supprimer un enfant avec son id ---
router.delete('/:id', enfantsCtrl.deleteEnfant);

// --- Ajouter une actualité pour un enfant ---
router.post('/:id', enfantsCtrl.addActualite);

// --- Supprimer une actualité pour un enfant ---

module.exports = router;
