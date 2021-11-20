const express = require('express');
const { validID } = require('../utils/helpers');
// controlador
const serviceController = require('../controllers/service');

const app = express.Router();

// rutas
app.get('/service', serviceController.getAll);
app.get('/service/:id', validID, serviceController.getOne);
app.post('/service', serviceController.createNew);
app.put('/service/:id', validID, serviceController.updateOne);
app.delete('/service/:id', validID, serviceController.deleteOne);

module.exports = app;
