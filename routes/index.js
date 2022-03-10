const router = require('express').Router();

const pageRoutes = require('./page');
const serviceRoutes = require('./service');
const locationRoutes = require('./location');
const userRoutes = require('./user');
const authRoutes = require('./auth');

// base rutas
router.use('/page', pageRoutes);
router.use('/service', serviceRoutes);
router.use('/location', locationRoutes);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);

module.exports = router;
