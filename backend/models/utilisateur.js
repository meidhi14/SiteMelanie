const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const TypeUtilisateur = require('./type_utilisateur');

const Utilisateur = sequelize.define(
  'utilisateur',
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

Utilisateur.belongsTo(TypeUtilisateur, {
  foreignKey: 'type_utilisateur_id',
});

module.exports = Utilisateur;
