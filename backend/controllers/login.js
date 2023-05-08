const Nourrice = require('../models/Nourrice');
const Enfant = require('../models/Enfant');
const bcrypt = require('bcrypt');

exports.login = (req, res, next) => {
  // Vérifier si les identifiants correspondent à un compte nourrice
  Nourrice.findOne({
    identifiant: req.body.identifiant,
  })
    .then((nourrice) => {
      if (nourrice) {
        // Compte nourrice trouvé
        bcrypt
          .compare(req.body.password, nourrice.password)
          .then(() => {
            res.status(200).json({
              message: 'Connexion réussie en tant que nourrice',
              compteNourrice: true,
            });
          })
          .catch((error) => res.status(400).json(error));
      } else {
        // Vérifier si les identifiants correspondent à un compte enfant
        Enfant.findOne({
          identifiant: req.body.identifiant,
        })
          .then((enfant) => {
            if (enfant) {
              // Compte enfant trouvé
              bcrypt
                .compare(req.body.password, enfant.password)
                .then(() => {
                  res.status(200).json({
                    message: 'Connexion réussie en tant que enfant',
                    compteNourrice: false,
                  });
                })
                .catch((error) => res.status(400).json(error));
            } else {
              // Identifiants invalides
              res.status(401).json({ message: 'Identifiants invalides' });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ message: 'Error', error }));
};
