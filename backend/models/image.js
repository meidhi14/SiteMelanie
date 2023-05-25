const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Image = sequelize.define(
  'image',
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Image;
