const { response } = require('express');
const db = require('../../config/database');

const getMaterial = async(req, res = response) => {
    try {
        db.connect(async(error_conexion, client, release) => {
            const response = await client.query(`SELECT * FROM public.ropa`);
            release();
            res.status(200).json({
                OK: true,
                Message: '',
                Data: response.rows
            });
            db.end();
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            OK: false,
            Message: 'An error has ocurred.',
            Data: error
        });
    }
}

module.exports = {
    getMaterial,
}
