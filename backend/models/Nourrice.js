const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const nourriceSchema = mongoose.Schema({
  identifiant: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  prenom: { type: String, require: true },
  images: [
    {
      image: { type: String, require: true },
    },
  ],
  description: { type: String, require: true },
});

nourriceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Nourrice', nourriceSchema);
