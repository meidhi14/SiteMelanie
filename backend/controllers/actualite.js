const connection = require('../connectionDb');

// --- Récupérer toutes les actualite d'un utilisateur avec son id ---
exports.sendAllActualite = (req, res, next) => {
  connection.query(
    'SELECT * FROM actualite WHERE utilisateur_id = ?',
    [req.params.idUtilisateur],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
};

// --- Ajouter une actualite avec l'id de l'utilisateur ---
exports.createActualite = (req, res, next) => {
  const date = new Date();
  connection.query(
    'INSERT INTO actualite (titre, description, date, utilisateur_id) VALUES (?, ?, ?, ?)',
    [req.body.titre, req.body.description, date, req.params.idUtilisateur],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(201).json({ message: 'Actualité envoyée !' });
    }
  );
};

// --- Supprimer une actualite avec son id ---
exports.deleteOneActualite = (req, res, next) => {
  connection.query(
    'DELETE FROM actualite WHERE id = ?',
    [req.params.idActualite],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json({ message: 'Actualite Supprimée ! ' });
    }
  );
};
