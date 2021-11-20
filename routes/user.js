const express = require('express');
const multiparty = require('connect-multiparty');
const { validID } = require('../utils/helpers');
const { validateRequest } = require('../middlewares/authenticated');
const router = express.Router();

const userController = require('../controllers/user');

// middleware
const mpAvatar = multiparty({ uploadDir: './uploads' });

// autenticacion
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user', validateRequest, userController.getAll);
router.get('/user/:id', validateRequest, validID, userController.getOne);
router.put(
  '/user/upload-avatar/:id',
  validateRequest,
  validID,
  mpAvatar,
  userController.uploadAvatar
);

module.exports = router;
