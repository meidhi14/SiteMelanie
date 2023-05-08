const Enfant = require('../models/Enfant');
const bcrypte = require('bcrypt');

// --- Afficher la liste des enfants en garde
exports.getAllEnfants = (req, res, next) => {
  Enfant.find()
    .then((enfants) => res.status(200).json(enfants))
    .catch((error) => res.status(400).json({ error }));
};

// --- Ajouter un enfant dans la BD ---
exports.createEnfant = (req, res, next) => {
  bcrypte.hash(req.body.password, 10).then((hash) => {
    const enfant = new Enfant({
      identifiant: req.body.identifiant,
      password: hash,
      prenom: req.body.prenom,
      image: req.body.image,
      actualites: req.body.actualites || [],
    });

    // Vérifier si l'identifiant existe déjà
    Enfant.findOne({ identifiant: enfant.identifiant })
      .then((existingEnfant) => {
        if (existingEnfant) {
          return res.status(409).json({
            message: 'Un enfant avec cet identifiant existe déjà.',
          });
        }

        // Ajouter l'enfant à la base de données
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
              error,
            });
          });
      })
      .catch((error) => {
        res.status(400).json({
          message: 'Une erreur est survenue.',
          error,
        });
      });
  });
};

// --- Afficher la page de l'enfant ---
exports.getOneEnfant = (req, res, next) => {
  Enfant.findOne({ _id: req.params.idEnfant })
    .then((enfant) =>
      res.status(200).json({ message: 'Enfant trouvé !', enfant })
    )
    .catch((error) => res.status(400).json(error));
};

// --- Supprimer un enfant avec son id---
exports.deleteEnfant = (req, res, next) => {
  Enfant.deleteOne({ _id: req.params.idEnfant })
    .then(() => res.status(200).json({ message: 'Enfant Supprimé !' }))
    .catch((error) => res.status(400).json(error));
};

// --- Ajouter une actualité pour un enfant ---
exports.addActualite = (req, res, next) => {
  Enfant.findOneAndUpdate(
    { _id: req.params.idEnfant },
    {
      $push: {
        actualites: {
          titre: req.body.titre,
          images: req.body.images,
          description: req.body.description,
        },
      },
    },
    { new: true }
  )
    .then(() => res.status(201).json({ message: 'Actualité ajouté !' }))
    .catch((error) => res.status(400).json(error));
};

// --- Modifier une actualité pour un enfant ---
exports.putActualite = (req, res, next) => {
  Enfant.findOneAndUpdate(
    { _id: req.params.idEnfant, 'actualites._id': req.params.idActualite },
    {
      $set: {
        'actualites.$.titre': req.body.titre,
        'actualites.$.images': req.body.images,
        'actualites.$.description': req.body.description,
      },
    },
    { new: true }
  )
    .then(() => res.status(200).json({ message: 'Actualité modifié !' }))
    .catch((error) => res.status(400).json(error));
};

// --- Supprimer une actualité pour un enfant ---
exports.deleteActualite = (req, res, next) => {
  Enfant.findOneAndUpdate(
    { _id: req.params.idEnfant },
    { $pull: { actualites: { _id: req.params.idActualite } } },
    { new: true }
  )
    .then(() => res.status(200).json({ message: 'Actualité Supprimé' }))
    .catch((error) => res.status(400).json(error));
};
