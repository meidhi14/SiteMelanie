const Commentaire = require('../models/Commentaire');

// --- Récuperer tous les commentaires ---
exports.getAllCommentaires = (req, res, next) => {
  Commentaire.find()
    .then((commentaires) => res.status(200).json(commentaires))
    .catch((error) => res.status(400).json({ error }));
};

// --- Ajouter un commentaire dans le livre d'or ---
exports.createCommentaire = (req, res, next) => {
  const commentaire = new Commentaire({
    prenom: req.body.prenom,
    description: req.body.description,
  });

  commentaire
    .save()
    .then(() => res.status(201).json({ message: 'Commentaire Créé !' }))
    .catch((error) => res.status(400).json(error));
};
