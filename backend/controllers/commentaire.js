const Commentaire = require('../models/commentaire');

// --- Récupérer les commentaire dans le livre d'or ---
exports.getAllCommentaire = (req, res, next) => {
  Commentaire.findAll()
    .then((commentaires) => res.status(200).json({ commentaires }))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- Supprimer un commentaire avec son id ---
exports.deleteOneCommentaire = (req, res, next) => {
  Commentaire.destroy({
    where: { id: req.params.idCommentaire },
  })
    .then(() => res.status(200).json({ message: 'Commentaire Supprimé !' }))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- Ajouter un commentaire ---
exports.insertCommentaire = (req, res, next) => {
  Commentaire.create({
    prenom: req.body.prenom,
    description: req.body.description,
    date: new Date(),
  })
    .then(() => {
      res.status(201).json({ message: 'Commentaire créé !' });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};
