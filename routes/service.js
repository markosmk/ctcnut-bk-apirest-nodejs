const router = require('express').Router();
const { validID } = require('../utils/helpers');
// controlador
const serviceController = require('../controllers/service');

// rutas
/**
 * @swagger
 * /api/service:
 *   get:
 *     description: All services
 *     responses:
 *       200:
 *         description: Returns all the services
 */
router.get('/service', serviceController.getAll);
/**
 * @swagger
 * /service/{id}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service ID.
 *     description: Get a service by id
 *     responses:
 *       200:
 *         description: Returns the requested services
 */
router.get('/service/:id', validID, serviceController.getOne);

/**
 * @swagger
 * /api/service:
 *   post:
 *     parameters:
 *      - in: body
 *        name: service
 *        description: New service
 *        schema:
 *          type: object
 *          properties:
 *            movieName:
 *              type: string
 *            service:
 *              type: string
 *            movieContext:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/service', serviceController.createNew);

/**
 * @swagger
 * /service/{id}:
 *   patch:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service ID.
 *      - in: body
 *        name: service
 *        description: Update service
 *        schema:
 *          type: object
 *          properties:
 *            movieName:
 *              type: string
 *            service:
 *              type: string
 *            movieContext:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.put('/service/:id', validID, serviceController.updateOne);

/**
 * @swagger
 * /service/{id}:
 *   delete:
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The service ID.
 *     description: Delete a service by id
 *     responses:
 *       200:
 *         description: Returns the requested service
 */
router.delete('/service/:id', validID, serviceController.deleteOne);

module.exports = router;
