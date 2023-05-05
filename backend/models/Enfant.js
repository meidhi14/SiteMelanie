const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const enfantSchema = mongoose.Schema({
  identifiant: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  prenom: { type: String, require: true },
  image: { type: String, require: true },
  actualites: [
    {
      actualiteId: { type: String, unique: true },
      titre: { type: String },
      images: [
        {
          image: { type: String },
        },
      ],
      description: { type: String },
      date: { type: Date },
    },
  ],
});

enfantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Enfant', enfantSchema);
