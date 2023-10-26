// routes/secretsRoutes.js

const express = require('express');
const isAuthenticated = require('../middleware/auth');
const secretsController = require('../controllers/secretController');

const router = express.Router();

router.get('/secrets', isAuthenticated, secretsController.getSecrets);

module.exports = router;
