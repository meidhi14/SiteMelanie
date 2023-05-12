// --- Express ---
const express = require('express');
const app = express();

// --- SQlite ---
const sqlite3 = require('sqlite3');
const dbname = 'database.sqlite';
// --- Ouverture de la BDD SQlite ---
let db = new sqlite3.Database(dbname, (err) => {
  if (err) {
    throw err;
  } else {
    console.log('Database started on ' + dbname + ' !');
  }
});

/* --- Fermeture de la BDD SQlite ---
db.close((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Database closed !');
  }
});*/

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

module.exports = app;
