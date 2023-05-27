const fs = require('fs');
const path = require('path');
const Image = require('./models/image');

// Fonction pour enregistrer les images
const enregistrerImages = (id, images) => {
  const imagePromises = images.map((image) => {
    return new Promise((resolve, reject) => {
      fs.readFile(image.path, (err, data) => {
        if (err) {
          console.error("Erreur lors de la lecture du fichier d'image", err);
          reject(err);
          return;
        }

        Image.create({
          nom: image.filename,
          format: image.mimetype,
          utilisateur_id: id,
        })
          .then(() => {
            console.log('Nouvelle image enregistrée !');
            resolve();
          })
          .catch((error) => {
            console.log(
              "Erreur lors de l'enregistrement de la nouvelle image",
              error
            );
            reject(error);
          });
      });
    });
  });

  return Promise.all(imagePromises);
};

// Fonction pour supprimer une image
const supprimerImage = (id) => {
  if (image) {
    const cheminImage = path.join('images', image.nom);
    fs.unlinkSync(cheminImage);
    Image.destroy({ where: { id: image.id } })
      .then(() => {
        console.log('Ancienne image supprimée !');
      })
      .catch((error) => {
        console.log("Erreur lors de la suppression de l'ancienne image", error);
      });
  }
};

module.exports = { enregistrerImages, supprimerImage };
