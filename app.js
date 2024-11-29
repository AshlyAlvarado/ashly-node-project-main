const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/routes');
const weatherRoutes  = require('./features/materials/weatherController');

app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

app.use( routes );
app.use('/api', weatherRoutes);

module.exports = app;
