const router = require('express').Router();
// controller
const userController = require('../controllers/user');

// middlewares
const { validID } = require('../utils/helpers');
const { validateRequest } = require('../middlewares/authenticated');
const { uploadImage } = require('../middlewares/uploadFiles');

// rutas autenticacion
router.post('/register', userController.register);
router.post('/login', userController.login);
// rutas usuario
router.get('/user', validateRequest, userController.getAll);
router.get('/user/:id', validateRequest, validID, userController.getOne);

router.put(
  '/user/upload-avatar/:id',
  validateRequest,
  validID,
  uploadImage.single('avatar'),
  userController.uploadAvatar
);

module.exports = router;
