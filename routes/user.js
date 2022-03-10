const router = require('express').Router();
// controller
const userController = require('../controllers/user');

// middlewares
const validID = require('../middlewares/validID');
const { validateRequest } = require('../middlewares/authenticated');
const { uploadImage } = require('../middlewares/uploadFiles');

// rutas usuario
router.get('/', validateRequest, userController.getAll);
router.get('/:id', validateRequest, validID, userController.getOne);
router.put('/:id', validateRequest, validID, userController.updateOne);
router.delete('/:id', validateRequest, validID, userController.deleteOne);

// aditionals
router.put(
  '/upload-avatar/:id',
  validateRequest,
  validID,
  uploadImage.single('avatar'),
  userController.uploadAvatar
);

module.exports = router;
