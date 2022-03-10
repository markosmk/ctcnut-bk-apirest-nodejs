const router = require('express').Router();
const validID = require('../middlewares/validID');
// controlador
const serviceController = require('../controllers/service');

router.get('/', serviceController.getAll);
router.get('/:id', validID, serviceController.getOne);
router.post('/', serviceController.createNew);
router.put('/:id', validID, serviceController.updateOne);
router.delete('/:id', validID, serviceController.deleteOne);

module.exports = router;
