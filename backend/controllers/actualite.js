const { Utilisateur, Actualite, Image } = require('../models');
const { enregistrerImagesActualite } = require('../fonctions');
const path = require('path');
const fs = require('fs');

// --- Récupérer toutes les actualite d'un utilisateur avec son id ---
exports.sendAllActualite = (req, res, next) => {
  const idUtilisateur = req.params.idUtilisateur;

  Utilisateur.findByPk(idUtilisateur, { include: { model: Image } })
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

// --- Récupérer UNE actualite d'un utilisateur avec son id ---
exports.getOneActualite = (req, res, next) => {
  const idActualite = req.params.idActualite;

  Actualite.findByPk(idActualite, { include: { model: Image } })
    .then((actualite) => res.status(200).json(actualite))
    .catch((error) => res.status(400).json({ error }));
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
            enregistrerImagesActualite(actualite.id, images)
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
exports.modifyOneActualite = async (req, res, next) => {
  const idActualite = req.params.idActualite;
  const { titre, description, date } = req.body;
  const images = req.files;
  console.log(req.files);

  try {
    const actualite = await Actualite.findByPk(idActualite, {
      include: { model: Image },
    });
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée.' });
    }

    if (images) {
      console.log('Il y a des images');

      // Supprimer les anciennes images de l'actualité
      for (const image of actualite.images) {
        const cheminImage = path.join('images', image.nom);
        fs.unlinkSync(cheminImage);
        await Image.destroy({ where: { id: image.id } });
        console.log('Ancienne image supprimée :', image.id);
      }
      enregistrerImagesActualite(actualite.id, images);
    }

    // Mettre à jour les propriétés de l'actualité
    actualite.titre = titre || actualite.titre;
    actualite.description = description || actualite.description;
    actualite.date = date || new Date();

    // Enregistrer les modifications dans la base de données
    await actualite.save();

    res.status(200).json({ message: 'Actualité mise à jour.' });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
