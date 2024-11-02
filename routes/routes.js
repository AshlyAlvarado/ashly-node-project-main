const { Router } = require('express');
const router = Router();
const apiPrefix = '/api';


// // Importing Routes
// const authentication = require('../features/authentication/authRoutes');
const material = require('../features/materials/materialRoutes');

// Implementing Routes
//router.use(`${apiPrefix}/auth`, authentication);
router.use(`${apiPrefix}/material`, material);


module.exports = router;
