const router = require('express').Router();

const locationController = require('../controllers/location');

const validID = require('../middlewares/validID');

router.get('/', locationController.getAll);
router.get('/:id', validID, locationController.getOne);
router.post('/', locationController.createNew);
router.put('/:id', validID, locationController.updateOne);

module.exports = router;
