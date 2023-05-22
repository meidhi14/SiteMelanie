const express = require('express');
const router = express.Router();
const commentaireCtrl = require('../controllers/commentaire');

// --- Récupérer les commentaire dans le livre d'or ---
router.get('/', commentaireCtrl.getAllCommentaire);

// --- Supprimer un commentaire avec son id ---
router.delete('/:id', commentaireCtrl.deleteOneCommentaire);

// --- Ajouter un commentaire ---
router.post('/', commentaireCtrl.insertCommentaire);

module.exports = router;
