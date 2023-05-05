const Enfant = require('../models/Enfant');

// --- Afficher la liste des enfants en garde
exports.getEnfants = (req, res, next) => {
  Enfant.find()
    .then((enfants) => res.status(200).json(enfants))
    .catch((error) => res.status(400).json({ error }));
};

// --- Ajouter un enfant dans la BD ---
exports.addEnfant = (req, res, next) => {
  const enfant = new Enfant({
    identifiant: req.body.identifiant,
    password: req.body.password,
    prenom: req.body.prenom,
    image: req.body.image,
    actualites: req.body.actualites,
  });

  enfant
    .save()
    .then(() => res.status(201).json({ message: 'Enfant ajouté !' }))
    .catch((error) => res.status(400).json(error));
};
