const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateur');

// --- Ajouter un compte utilisateur ---
router.post('/', utilisateurCtrl.createUtilisateur);

// --- Modifier un compte utilisateur avec son id ---
router.put('/:idUtilisateur', utilisateurCtrl.modifyOneUtilisateur);

// --- Supprimer un compte utilisateur avec son id ---
router.delete('/:idUtilisateur', utilisateurCtrl.deleteOneUtilisateur);

// --- Récupérer les information d'un utilisateur avec son id ---
router.get('/:idUtilisateur', utilisateurCtrl.getOneUtilisateur);

module.exports = router;
