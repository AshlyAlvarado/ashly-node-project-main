const { response } = require('express');
const db = require('../../config/database');

const getMaterial = async (req, res = response) => {
    try {
        // Conectar a la base de datos
        const client = await db.connect();

        // Ejecutar la consulta
        const response = await client.query(`SELECT * FROM db.material`);

        // Liberar la conexión
        client.release();

        // Enviar la respuesta
        res.status(200).json({
            OK: true,
            Message: '',
            Data: response.rows
        });
    } catch (error) {
        console.error("Error en la consulta:", error);

        res.status(500).json({
            OK: false,
            Message: 'An error has occurred.',
            Data: error.message
        });
    }
};

module.exports = {
    getMaterial,
};
