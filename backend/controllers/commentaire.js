const connection = require('../connectionDb');

// --- Récupérer les commentaire dans le livre d'or ---
exports.getAllCommentaire = (req, res, next) => {
  connection.query('SELECT * FROM commentaire', (err, rows, fields) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};

// --- Supprimer un commentaire avec son id ---
exports.deleteOneCommentaire = (req, res, next) => {
  connection.query(
    'DELETE FROM commentaire WHERE id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json({ message: 'Commentaire supprimé !' });
    }
  );
};

// --- Ajouter un commentaire ---
exports.insertCommentaire = (req, res, next) => {
  const { prenom, description } = req.body;
  const date = new Date();
  connection.query(
    'INSERT INTO commentaire (prenom, description, date) VALUES (?, ?, ?)',
    [prenom, description, date],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(201).json({ message: 'Commentaire inséré avec succès !' });
    }
  );
};
