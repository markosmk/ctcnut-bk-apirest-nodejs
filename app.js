const express = require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const app = express();

// Middlewares
// para parsear data en json
app.use(express.json());

app.use('/api/v1', require('./routes'));

// resolucion rutas no asignadas
app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;
