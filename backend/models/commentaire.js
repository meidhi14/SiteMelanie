const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Commentaire = sequelize.define(
  'commentaire',
  {
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Commentaire;
