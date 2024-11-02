const { Router } = require('express');
const { getMaterial } = require('./materialAppService');

const router = Router();

/*
    Material Routes
    host + /api/material
*/

router.get('/',
    [],
    getMaterial
);

module.exports = router;
