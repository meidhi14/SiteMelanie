const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcrypt');

// --- Ajouter un compte utilisateur ---
exports.createUtilisateur = (req, res, next) => {
  const { nom, prenom, email, password, type_utilisateur_id } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      Utilisateur.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        type_utilisateur_id,
      })
        .then(() => {
          res.status(201).json({ message: 'Utilisateur créé !' });
        })
        .catch((error) => {
          console.log(error); // Ajout de la console.log de l'erreur
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error); // Ajout de la console.log de l'erreur
      res.status(500).json({ error });
    });
};

// --- Modifier un compte utilisateur avec son id ---
exports.modifyOneUtilisateur = (req, res, next) => {
  Utilisateur.findOne({
    where: {
      id: req.params.idUtilisateur,
    },
  }).then((utilisateur) => {
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Mettre à jour les propriétés de l'utilisateur
    utilisateur.nom = req.body.nom;
    utilisateur.prenom = req.body.prenom;
    utilisateur.email = req.body.email;
    utilisateur.password = req.body.password;
    utilisateur.description = req.body.description;

    // Enregistrer les modifications dans la base de données
    return utilisateur
      .save()
      .then(() => {
        res.status(200).json({ message: 'Utilisateur modifié !' });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  });
};

// --- Supprimer un compte utilisateur avec son id ---
exports.deleteOneUtilisateur = (req, res, next) => {
  Utilisateur.destroy({
    where: { id: req.params.idUtilisateur },
  })
    .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
    .catch((error) => res.status(400).json(error));
};

// --- Récupérer les information d'un utilisateur avec son id ---
exports.getOneUtilisateur = (req, res, next) => {
  Utilisateur.findOne({
    where: { id: req.params.idUtilisateur },
  })
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé !' });
      }
      res.status(200).json({ utilisateur });
    })
    .catch((error) => res.status(400).json(error));
};

// --- Récupérer la liste des Utilisateur ---
exports.getAllUtilisateur = (req, res, next) => {
  Utilisateur.findAll()
    .then((utilisateurs) => res.status(200).json(utilisateurs))
    .catch((error) => res.status(400).json(error));
};
