// --- Importation des models ---
const Utilisateur = require('./utilisateur');
const Actualite = require('./actualite');
const TypeUtilisateur = require('./type_utilisateur');
const Image = require('./image');

// --- Création des relations entre les models ---
Utilisateur.belongsTo(TypeUtilisateur, { foreignKey: 'type_utilisateur_id' });
Utilisateur.hasMany(Actualite, { foreignKey: 'utilisateur_id' });
Utilisateur.hasMany(Image, { foreignKey: 'utilisateur_id' });

Actualite.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Actualite.hasMany(Image, { foreignKey: 'actualite_id' });

Image.belongsTo(Utilisateur, { foreignKey: 'utilisateur_id' });
Image.belongsTo(Actualite, { foreignKey: 'actualite_id' });

// Exportez vos modèles
module.exports = {
  Utilisateur,
  Actualite,
  TypeUtilisateur,
  Image,
};
