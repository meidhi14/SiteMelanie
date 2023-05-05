const Nourrice = require('../models/Nourrice');

// --- Récuperer les information de la nourrice ---
exports.getNourrice = (req, res, next) => {
  Nourrice.find()
    .then((nourrice) => res.status(200).json(nourrice))
    .catch((error) => res.status(400).json({ error }));
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
