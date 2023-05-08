const express = require('express');
const router = express.Router();
const enfantsCtrl = require('../controllers/enfants');

// --- Afficher la liste des enfants en garde
router.get('/', enfantsCtrl.getAllEnfants);

// --- Ajouter un enfant ---
router.post('/', enfantsCtrl.createEnfant);

// --- Afficher la page de l'enfant ---
router.get('/:idEnfant', enfantsCtrl.getOneEnfant);

// --- Supprimer un enfant avec son id ---
router.delete('/:idEnfant', enfantsCtrl.deleteEnfant);

// --- Ajouter une actualité pour un enfant ---
router.post('/:idEnfant', enfantsCtrl.addActualite);

// --- Modifier une actualité pour un enfant ---
router.put('/:idEnfant/:idActualite', enfantsCtrl.putActualite);

// --- Supprimer une actualité pour un enfant ---
router.delete('/:idEnfant/:idActualite', enfantsCtrl.deleteActualite);

module.exports = router;
