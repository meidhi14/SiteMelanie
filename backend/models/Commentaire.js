const mongoose = require('mongoose');

const commentaireSchema = mongoose.Schema({
  prenom: { type: String, require: true },
  description: { type: String, require: true },
  date: { type: Date, require: true },
});

module.exports = mongoose.model('Commentaire', commentaireSchema);
