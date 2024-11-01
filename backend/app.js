const express = require('express');
const db = require('./config/database');
const app = express();
require('dotenv').config();
const cors = require('cors');
const routes = require('./routes/routes');

db.connect(async(error_conexion, client, release) => {
    const response = await client.query(`SELECT * FROM public.ropa`);
    release();
    console.log(response.rows);
    db.end();
});


app.use( cors() );
app.use( express.static('public') );
app.use( express.json() );

app.use( routes );

module.exports = app;
