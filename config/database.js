const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'root',
    database: 'avanza',
});

module.exports = db;
