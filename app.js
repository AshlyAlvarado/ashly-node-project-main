const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/routes');

app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

app.use( routes );

module.exports = app;
