const { Utilisateur, TypeUtilisateur, Image, Actualite } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// --- Utilisation des fonctions pour les images ---
const { enregistrerImages, supprimerImage } = require('../fonctions');

// --- Utilisation des variables d'environnement ---
require('dotenv').config();

// --- Ajouter un compte utilisateur ---
exports.createUtilisateur = (req, res, next) => {
  const { nom, prenom, email, password, description, type_utilisateur_id } =
    req.body;

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      Utilisateur.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        description,
        type_utilisateur_id,
      })
        .then((utilisateur) => {
          if (req.files) {
            // Si des images sont téléchargées
            const images = req.files;

            // Enregistrer les images
            enregistrerImages(utilisateur.id, images);
          }

          res.status(201).json({ message: 'Utilisateur créé !' });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

// --- Modifier un utilisateur ---
exports.modifyOneUtilisateur = (req, res, next) => {
  const { nom, prenom, email, password, description, type_utilisateur_id } =
    req.body;
  const idUtilisateur = req.params.idUtilisateur;

  Utilisateur.findByPk(idUtilisateur)
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé !' });
      }

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          utilisateur.nom = nom;
          utilisateur.prenom = prenom;
          utilisateur.email = email;
          utilisateur.password = hashedPassword;
          utilisateur.description = description;
          utilisateur.type_utilisateur_id = type_utilisateur_id;

          // Vérifier si une nouvelle image est présente
          if (req.file) {
            // Supprimer l'ancienne image du dossier "images" et de la base de données
            const ancienneImage = utilisateur.image;
            supprimerImage(ancienneImage);

            // Enregistrer la nouvelle image dans le dossier "images" et dans la base de données
            const nouvelleImage = req.file;
            enregistrerImages(utilisateur.id, nouvelleImage);
          }

          // Mettre à jour l'utilisateur dans la base de données
          utilisateur
            .save()
            .then(() => {
              res.status(200).json({ message: 'Utilisateur modifié !' });
            })
            .catch((error) => {
              console.log(error);
              res.status(400).json({ error });
            });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

// --- Supprimer un compte utilisateur avec son id ---
exports.deleteOneUtilisateur = async (req, res, next) => {
  try {
    // Récuperer les images en liens avec l'utilisateur
    const imagesUtilisateur = await Image.findAll({
      where: { utilisateur_id: req.params.idUtilisateur },
    });

    // Pour chaque Image la supprimé !
    imagesUtilisateur.forEach((image) => {
      const cheminImage = path.join('images', image.nom);
      fs.unlinkSync(cheminImage);
    });

    // Supprimer l'image dans la BDD
    await Image.destroy({
      where: { utilisateur_id: req.params.idUtilisateur },
    });

    // Supprimer l'utilisateur dans la BDD
    await Utilisateur.destroy({
      where: { id: req.params.idUtilisateur },
    });

    res.status(200).json({ message: 'Utilisateur supprimé !' });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
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
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- Récupérer la liste des Utilisateur et des ses informations ---
exports.getAllUtilisateur = (req, res, next) => {
  Utilisateur.findAll({ include: [{ model: Actualite }, { model: Image }] })
    .then((utilisateurs) => res.status(200).json(utilisateurs))
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- se connecter ---
exports.login = (req, res, next) => {
  console.log('avant recherche utilisateur');
  Utilisateur.findOne({
    where: { email: req.body.email.trim() },
    include: [{ model: TypeUtilisateur, as: 'type_utilisateur' }],
  })
    .then((utilisateur) => {
      if (!utilisateur) {
        return res
          .status(401)
          .json({ message: 'Paire login/mot de passe incorrecte' });
      }
      bcrypt
        .compare(req.body.password, utilisateur.password)
        .then((valid) => {
          console.log(valid);
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte' });
          }
          res.status(200).json({
            utilisateur_id: utilisateur.id,
            type_utilisateur: utilisateur.type_utilisateur.type,
            token: jwt.sign(
              { utilisateur_id: utilisateur.id },
              process.env.RANDOM_TOKEN_SECRET,
              {
                expiresIn: '24h',
              }
            ),
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};
