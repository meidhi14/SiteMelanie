const mongoose = require('mongoose');

const livreDorSchema = mongoose.Schema({
  prenom: { type: String, require: true },
  commentaire: { type: String, require: true },
  date: { type: Date, require: true },
});

module.exports = mongoose.model('LivreDor', livreDorSchema);
