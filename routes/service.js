const router = require('express').Router();
const { validID } = require('../utils/helpers');
// controlador
const serviceController = require('../controllers/service');

// rutas
router.get('/service', serviceController.getAll);
router.get('/service/:id', validID, serviceController.getOne);
router.post('/service', serviceController.createNew);
router.put('/service/:id', validID, serviceController.updateOne);
router.delete('/service/:id', validID, serviceController.deleteOne);

module.exports = router;
