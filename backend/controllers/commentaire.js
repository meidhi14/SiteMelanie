const Commentaire = require('../models/Commentaire');

// --- Récuperer tous les commentaires ---
exports.getAllCommentaires = (req, res, next) => {
  Commentaire.find()
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(400).json({ error }));
};
