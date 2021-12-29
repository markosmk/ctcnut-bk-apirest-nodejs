const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { errorHandler } = require('./utils/errorHandler');
const app = express();

// para recibir data en json
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'CTC REST API',
      description:
        'A REST API built with Express and MongoDB. This API provides services and the context of the services for customers.',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// rutas
const serviceRoutes = require('./routes/service');
const userRoutes = require('./routes/user');

// base rutas
app.use('/api', serviceRoutes);
app.use('/api', userRoutes);
// documentacion de ApiRest con Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// otras Rutas
app.get('*', function (req, res, next) {
  const error = new Error(`${req.ip} tried to access ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});
app.use(errorHandler);

module.exports = app;
