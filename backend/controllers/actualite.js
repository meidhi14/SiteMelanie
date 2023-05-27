const { Utilisateur, Actualite, Image } = require('../models');
const { enregistrerImages } = require('../fonctions');

// --- Récupérer toutes les actualite d'un utilisateur avec son id ---
exports.sendAllActualite = (req, res, next) => {
  const idUtilisateur = req.params.idUtilisateur;

  Utilisateur.findByPk(idUtilisateur)
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé !' });
      }

      Actualite.findAll({
        where: { utilisateur_id: idUtilisateur },
        include: Image,
      })
        .then((actualites) => {
          res.status(200).json({ actualites });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- Ajouter une actualite avec l'id de l'utilisateur ---
exports.createActualite = (req, res, next) => {
  const idUtilisateur = req.params.idUtilisateur;
  const { titre, description, date } = req.body;
  const images = req.files; // Utilisez req.files pour accéder aux fichiers envoyés

  Utilisateur.findByPk(idUtilisateur)
    .then((utilisateur) => {
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé !' });
      }

      Actualite.create({
        titre,
        description,
        date: date || new Date(),
        utilisateur_id: idUtilisateur,
      })
        .then((actualite) => {
          // Vérifier si des images sont fournies
          if (images && images.length > 0) {
            // Créer les images associées à l'actualité
            enregistrerImages(idUtilisateur, images)
              .then(() => {
                res
                  .status(201)
                  .json({ message: 'Actualité et images créées !' });
              })
              .catch((error) => {
                console.log(error);
                res.status(400).json(error);
              });
          } else {
            res.status(201).json({ message: 'Actualité créée !' });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- Supprimer une actualite avec son id ---
exports.deleteOneActualite = (req, res, next) => {
  const idActualite = req.params.idActualite;

  Actualite.findByPk(idActualite)
    .then((actualite) => {
      if (!actualite) {
        return res.status(404).json({ message: 'Actualité non trouvée !' });
      }

      actualite
        .destroy()
        .then(() => {
          res.status(200).json({ message: 'Actualité supprimée !' });
        })
        .catch((error) => {
          console.log(error);
          res.status(400).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};

// --- Modifier une actualite avec son id ---
exports.modifyOneActualite = (req, res, next) => {
  const idActualite = req.params.idActualite;
  const { titre, description, date } = req.body;

  Actualite.findByPk(idActualite)
    .then((actualite) => {
      if (!actualite) {
        return res.status(404).json({ message: 'Actualité non trouvée.' });
      }

      // Mettre à jour les propriétés de l'actualité
      actualite.titre = titre;
      actualite.description = description;
      actualite.date = date || new Date();

      // Enregistrer les modifications dans la base de données
      return actualite.save();
    })
    .then(() => {
      res.status(200).json({ message: 'Actualité modifiée !' });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
};
