const jwt = require('jsonwebtoken');

// Middleware d'authentification
const auth = (req, res, next) => {
  // Récupérer le token d'authentification depuis les en-têtes de la requête
  const token = req.headers.authorization;

  // Vérifier si le token existe
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token d'authentification manquant." });
  }

  try {
    // Vérifier et décoder le token
    const decodedToken = jwt.verify(token, 'your-secret-key');

    // Ajouter les informations du token décrypté à l'objet de requête (req)
    req.userData = { userId: decodedToken.userId };

    // Passer au prochain middleware
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token d'authentification invalide." });
  }
};

module.exports = auth;
