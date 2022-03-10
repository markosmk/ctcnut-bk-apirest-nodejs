const router = require('express').Router();

const pageController = require('../controllers/page');

const validID = require('../middlewares/validID');

router.get('/', pageController.getAll);
router.get('/:id', validID, pageController.getOne);
router.post('/', pageController.createNew);
router.put('/:id', validID, pageController.updateOne);

module.exports = router;
