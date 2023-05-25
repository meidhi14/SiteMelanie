const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TypeUtilisateur = sequelize.define(
  'type_utilisateur',
  {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = TypeUtilisateur;
