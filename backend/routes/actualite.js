const express = require('express');
const router = express.Router();
const actualiteCtrl = require('../controllers/actualite');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// --- Récupérer TOUTES les actualite d'un utilisateur avec son id ---
router.get('/:idUtilisateur', auth, actualiteCtrl.sendAllActualite);

// --- Récupérer Une actualite d'un utilisateur avec son id ---
router.get('/:idUtilisateur/:idActualite', auth, actualiteCtrl.getOneActualite);

// --- Ajouter une actualite avec l'id de l'utilisateur ---
router.post('/:idUtilisateur', auth, multer, actualiteCtrl.createActualite);

// --- Supprimer une actualite avec son id ---
router.delete(
  '/:idUtilisateur/:idActualite',
  auth,
  multer,
  actualiteCtrl.deleteOneActualite
);

// --- Modifier une actualite avec son id ---
router.put(
  '/:idUtilisateur/:idActualite',
  auth,
  multer,
  actualiteCtrl.modifyOneActualite
);

module.exports = router;
