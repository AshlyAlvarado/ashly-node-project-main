const { response } = require('express');
const db = require('../../config/database');

const getAllMaterials = async (req, res = response) => {
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

// Nueva función para obtener un material por ID
const getMaterialById = async (req, res = response) => {
    const { id } = req.params;
    try {
        const client = await db.connect();
        const response = await client.query(`SELECT * FROM db.material WHERE id = $1`, [id]);
        client.release();

        if (response.rows.length === 0) {
            return res.status(404).json({
                OK: false,
                Message: `Material with ID ${id} not found.`,
                Data: null
            });
        }

        res.status(200).json({
            OK: true,
            Message: '',
            Data: response.rows[0]
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
    getAllMaterials,
    getMaterialById
};
