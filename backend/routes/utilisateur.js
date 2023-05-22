const express = require('express');
const router = express.Router();
const utilisateurCtrl = require('../controllers/utilisateur');

// --- Ajouter un compte utilisateur ---
router.post('/', utilisateurCtrl.createUtilisateur);

// --- Modifier un compte utilisateur avec son id ---
router.put('/:id', utilisateurCtrl.modifyOneUtilisateur);

// --- Supprimer un compte utilisateur avec son id ---
router.delete('/:id', utilisateurCtrl.deleteOneUtilisateur);

// --- Récupérer les information de l'assistante maternelle ---
router.get('/', utilisateurCtrl.getOneAssistanteMat);

// --- Modifier les information de l'assistante maternelle ---

module.exports = router;
