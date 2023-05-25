const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/login');

// --- Ajouter un compte utilisateur ---
router.post('/', loginCtrl.login);

module.exports = router;
