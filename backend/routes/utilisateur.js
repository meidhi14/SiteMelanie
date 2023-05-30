const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateur');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// --- Ajouter un compte utilisateur ---
router.post('/', auth, multer, utilisateurCtrl.createUtilisateur);

// --- Modifier un compte utilisateur avec son id ---
router.put(
  '/:idUtilisateur',
  auth,
  multer,
  utilisateurCtrl.modifyOneUtilisateur
);

// --- Supprimer un compte utilisateur avec son id ---
router.delete('/:idUtilisateur', auth, utilisateurCtrl.deleteOneUtilisateur);

// --- Récupérer les information d'un utilisateur avec son id ---
router.get('/:idUtilisateur', auth, utilisateurCtrl.getOneUtilisateur);

// --- Récupérer la liste des Utilisateur ---
router.get('/', auth, utilisateurCtrl.getAllUtilisateur);

// --- Se connecter ---
router.post('/login', utilisateurCtrl.login);

module.exports = router;
