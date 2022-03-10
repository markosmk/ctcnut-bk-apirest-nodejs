const router = require('express').Router();

const userController = require('../controllers/auth');
const { validateRequest } = require('../middlewares/authenticated');

// rutas autenticacion
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/logout', validateRequest, userController.logout);

module.exports = router;
