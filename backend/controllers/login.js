const Nourrice = require('../models/Nourrice');
const Enfant = require('../models/Enfant');

exports.login = (req, res, next) => {
  // Vérifier si les identifiants correspondent à un compte nourrice
  Nourrice.findOne({
    identifiant: req.body.identifiant,
    password: req.body.password,
  })
    .then((nourrice) => {
      if (nourrice) {
        // Compte nourrice trouvé
        res.status(200).json({
          message: 'Connexion réussie en tant que nourrice',
          compteNourrice: true,
        });
      } else {
        // Vérifier si les identifiants correspondent à un compte enfant
        Enfant.findOne({
          identifiant: req.body.identifiant,
          password: req.body.password,
        })
          .then((enfant) => {
            if (enfant) {
              // Compte enfant trouvé
              res.status(200).json({
                message: "Connexion réussie en tant qu'enfant",
                compteNourrice: false,
              });
            } else {
              // Identifiants invalides
              res.status(401).json({ message: 'Identifiants invalides' });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
