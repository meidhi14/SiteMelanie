const connection = require('../connectionDb');

// --- Ajouter un compte utilisateur ---
exports.createUtilisateur = (req, res, next) => {
  connection.query(
    'INSERT INTO utilisateur (nom, prenom, email, password,description, type_utilisateur_id) VALUES (?, ?, ?, ?, ?, ?)',
    [
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.body.description,
      req.body.type_utilisateur_id,
    ],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(201).json({ message: 'Utilisateur créé !' });
    }
  );
};

// --- Modifier un compte utilisateur avec son id ---
exports.modifyOneUtilisateur = (req, res, next) => {
  connection.query(
    'UPDATE utilisateur SET nom = ?, prenom = ?, email = ?, password = ?, description = ?, type_utilisateur_id = ? WHERE id = ?',
    [
      req.body.nom,
      req.body.prenom,
      req.body.email,
      req.body.password,
      req.body.description,
      req.body.type_utilisateur_id,
      req.params.id,
    ],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json({ message: 'Utilisateur modifié !' });
    }
  );
};

// --- Supprimer un compte utilisateur avec son id ---
exports.deleteOneUtilisateur = (req, res, next) => {
  connection.query(
    'DELETE FROM utilisateur WHERE id = ?',
    [req.params.id],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json({ message: 'Utilisateur Supprimé !' });
    }
  );
};

// --- Récupérer les information de l'assistante maternelle ---
exports.getOneAssistanteMat = (req, res, next) => {
  connection.query(
    'SELECT * FROM utilisateur WHERE type_utilisateur_id = 1',
    (err, rows, fields) => {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
};
