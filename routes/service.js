const express = require('express');
// controlador
const serviceController = require('../controllers/service');

const app = express.Router();

// rutas
app.post('/service', serviceController.create);

module.exports = app;
