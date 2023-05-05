const express = require('express');
const router = express.Router();
const commentaireCtrl = require('../controllers/commentaire');

// --- Récuperer tous les commentaires ---
router.get('/', commentaireCtrl.getAllCommentaires);

// --- Ajouter un commentaire dans le livre d'or ---
router.post('/', commentaireCtrl.createCommentaire);

// --- Supprimer un commentaire dans le livre d'or avec son id ---

router.delete('/:idCommentaire', commentaireCtrl.deleteCommentaire);

module.exports = router;
