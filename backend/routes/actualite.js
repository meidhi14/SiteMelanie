const express = require('express');
const router = express.Router();
const actualiteCtrl = require('../controllers/actualite');

// --- Récupérer toutes les actualite d'un utilisateur avec son id ---
router.get('/:idUtilisateur', actualiteCtrl.sendAllActualite);

// --- Ajouter une actualite avec l'id de l'utilisateur ---
router.post('/:idUtilisateur', actualiteCtrl.createActualite);

// --- Supprimer une actualite avec son id ---
router.delete('/:idUtilisateur/:idActualite', actualiteCtrl.deleteOneActualite);

module.exports = router;
