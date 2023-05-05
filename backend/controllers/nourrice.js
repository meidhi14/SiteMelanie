const Nourrice = require('../models/Nourrice');

// --- Récuperer les information de la nourrice ---
exports.getNourrice = (req, res, next) => {
  Nourrice.find()
    .then((nourrice) => res.status(200).json(nourrice))
    .catch((error) => res.status(400).json({ error }));
};
