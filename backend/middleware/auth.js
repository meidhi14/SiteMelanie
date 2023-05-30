const jwt = require('jsonwebtoken');

// --- Utilisation des variables d'environnement ---
require('dotenv').config();

// Middleware d'authentification
module.exports = (req, res, next) => {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  let token = req.headers.authorization;
  // Vérifier si le token existe
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token d'authentification manquant." });
  }

  try {
    // Vérifier et décoder le token
    let token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);

    // Ajouter les informations du token décrypté à l'objet de requête (req)
    req.auth = { utilisateur_id: decodedToken.utilisateur_id };

    // Passer au prochain middleware
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token d'authentification invalide." });
  }
};
