const Enfant = require('../models/Enfant');

// --- Afficher la liste des enfants en garde
exports.getEnfants = (req, res, next) => {
  Enfant.find()
    .then((enfants) => res.status(200).json(enfants))
    .catch((error) => res.status(400).json({ error }));
};

// --- Ajouter un enfant dans la BD ---
exports.createEnfant = (req, res, next) => {
  const enfant = new Enfant({
    identifiant: req.body.identifiant,
    password: req.body.password,
    prenom: req.body.prenom,
    image: req.body.image,
    actualites: req.body.actualites || [],
  });

  // Vérifie si l'identifiant existe déjà
  Enfant.findOne({ identifiant: enfant.identifiant })
    .then((existingEnfant) => {
      if (existingEnfant) {
        return res.status(409).json({
          message: 'Un enfant avec cet identifiant existe déjà.',
        });
      }

      // Ajoute l'enfant à la base de données s'il n'existe pas déjà
      enfant
        .save()
        .then((createdEnfant) => {
          res.status(201).json({
            message: 'Enfant ajouté avec succès.',
            enfant: createdEnfant,
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "Impossible de créer l'enfant.",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(400).json({
        message: 'Une erreur est survenue.',
        error: error,
      });
    });
};

// --- Afficher les actualités de l'enfant avec son id ---
exports.getOneEnfant = (req, res, next) => {
  Enfant.findOne({ _id: req.params.id })
    .then((enfant) => res.status(200).json(enfant))
    .catch((error) => res.status(400).json(error));
};

// --- Supprimer un enfant avec son id---
exports.deleteEnfant = (req, res, next) => {
  Enfant.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Enfant Supprimé !' }))
    .catch((error) => res.status(400).json(error));
};
