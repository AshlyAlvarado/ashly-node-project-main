const { Router } = require('express');
const { getAllMaterials, getMaterialById } = require('./materialAppService');

const materialRouter = Router();

/**
 * @swagger
 * /material:
 *   get:
 *     summary: Obtiene todos los materiales
 *     responses:
 *       200:
 *         description: Lista de materiales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 OK:
 *                   type: boolean
 *                 Message:
 *                   type: string
 *                 Data:
 *                   type: array
 *                   items:
 *                     type: object
 */
materialRouter.get('/', getAllMaterials);


// Nueva ruta para obtener un material por ID

/**
 * @swagger
 * /material/{id}:
 *   get:
 *     summary: Obtiene un material por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del material
 *     responses:
 *       200:
 *         description: Material encontrado
 *       404:
 *         description: Material no encontrado
 */
materialRouter.get('/:id', getMaterialById);

module.exports = materialRouter;
