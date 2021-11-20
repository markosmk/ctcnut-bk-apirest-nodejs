const express = require('express');
const { errorHandler } = require('./utils/errorHandler');
const app = express();

// para recibir data en json
app.use(express.json());

// rutas
const serviceRoutes = require('./routes/service');
const userRoutes = require('./routes/user');

// base rutas
app.use('/api', serviceRoutes);
app.use('/api', userRoutes);

app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;
