const express = require('express');
const app = express();

// para recibir data en json
app.use(express.json());

// rutas
const serviceRoutes = require('./routes/service');

// base rutas
app.use('/api', serviceRoutes);

module.exports = app;
