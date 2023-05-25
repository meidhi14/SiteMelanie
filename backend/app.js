// --- Express ---
const express = require('express');
const app = express();

// --- Utilisation des Routes
const utilisateurRoutes = require('./routes/utilisateur');
const commentaireRoutes = require('./routes/commentaire');
const actualiteRoutes = require('./routes/actualite');
const loginRoutes = require('./routes/login');

// --- les CORS ---
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// --- Utiliser les requêtes json ---
app.use(express.json());

// --- Utiliser la route Utilisateur ---
app.use('/utilisateur', utilisateurRoutes);

// --- Utiliser la route Actualité ---
app.use('/actualite', actualiteRoutes);

// --- Utiliser la route Commentaire ---
app.use('/livre-dor', commentaireRoutes);

// --- Utiliser la route Login ---
app.use('/login', loginRoutes);

module.exports = app;
