const express = require('express');
const router = express.Router();
const commentaireCtrl = require('../controllers/commentaire');
const auth = require('../middleware/auth');

// --- Récupérer les commentaire dans le livre d'or ---
router.get('/', commentaireCtrl.getAllCommentaire);

// --- Supprimer un commentaire avec son id ---
router.delete('/:idCommentaire', auth, commentaireCtrl.deleteOneCommentaire);

// --- Ajouter un commentaire ---
router.post('/', auth, commentaireCtrl.insertCommentaire);

module.exports = router;
