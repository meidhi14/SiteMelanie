const Nourrice = require('../models/Nourrice');
const bcrypt = require('bcrypt');

// --- Récuperer les information de la nourrice ---
exports.getNourrice = (req, res, next) => {
  Nourrice.find()
    .then((nourrice) => res.status(200).json(nourrice))
    .catch((error) => res.status(400).json({ error }));
};

// --- Ajouter un compte nourrice ---

exports.createNourrice = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const nourrice = new Nourrice({
      identifiant: req.body.identifiant,
      password: hash,
      prenom: req.body.prenom,
      images: req.body.images,
      description: req.body.description,
    });

    // Vérifier si l'identifiant existe déjà
    Nourrice.findOne({ identifiant: nourrice.identifiant })
      .then((existingEnfant) => {
        if (existingEnfant) {
          return res.status(409).json({
            message: 'Une Nourrice avec cet identifiant existe déjà.',
          });
        }

        // Ajouter la nourrice à la base de données
        nourrice
          .save()
          .then((createdNourrice) => {
            res.status(201).json({
              message: 'Nourrice ajouté avec succès.',
              enfant: createdNourrice,
            });
          })
          .catch((error) => {
            res.status(400).json({
              message: 'Impossible de créer la nourrice.',
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

// --- Modifier la présentation de la nourrice
exports.modifyNourrice = (req, res, next) => {
  Nourrice.findOneAndUpdate(
    { _id: req.params.idNourrice },
    {
      $set: {
        description: req.body.description,
        prenom: req.body.prenom,
      },
    },
    { new: true }
  )
    .then(() => res.status(200).json({ message: 'Nourrice modifié !' }))
    .catch((error) => res.status(400).json(error));
};
