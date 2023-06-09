const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Actualite = sequelize.define(
  'actualite',
  {
    titre: {
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

module.exports = Actualite;
