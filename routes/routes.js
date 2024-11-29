const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// // Importing Routes
// const authentication = require('../features/authentication/authRoutes');
const material = require('../features/materials/materialRoutes');
// const weather = require('../features/materials/calculoRoutes');


// Implementing Routes
//router.use(`${apiPrefix}/auth`, authentication);
router.use(`${apiPrefix}/material`, material);
// router.use(`${apiPrefix}/weatherApi`, weather);

module.exports = router;
