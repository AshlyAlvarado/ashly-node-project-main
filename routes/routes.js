const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// // Importing Routes
// const authentication = require('../features/authentication/authRoutes');
const materialRouter = require('../features/materials/materialRoutes');
const weatherRouter = require('../features/weather/weatherRoutes');
// const weather = require('../features/materials/calculoRoutes');


// Implementing Routes
//router.use(`${apiPrefix}/auth`, authentication);
router.use(`${apiPrefix}/material`, materialRouter);
router.use(`${apiPrefix}/weather`, weatherRouter);

module.exports = router;
