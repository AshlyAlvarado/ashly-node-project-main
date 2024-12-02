const { Router } = require('express');
const axios = require('axios');
const calcularResultados = require('./weatherService');

const weatherRouter = Router();

// Define la URL de la API externa
const WEATHER_API_URL = `https://api.tomorrow.io/v4/weather/forecast?location=15.843449%2C%20-87.955261&timesteps=hourly&apikey=${process.env.CLIMA_API_KEY}`;

// Función para obtener y procesar datos del clima
const obtenerDatosClima = async () => {
  try {
    const response = await axios.get(WEATHER_API_URL);
    const timelines = response.data.timelines;
    const hourlyData = timelines.hourly;

    // Procesa los datos necesarios
    return hourlyData.map(entry => ({
      time: entry.time,
      rainAccumulation: entry.values.rainAccumulation,
    }));
  } catch (error) {
    console.error("Error al obtener datos del clima:", error.message);
    throw new Error("Error al obtener datos del clima");
  }
};

// Endpoint para obtener los datos del clima
/**
 * @swagger
 * /weather:
 *   get:
 *     summary: Obtiene datos del clima
 *     responses:
 *       200:
 *         description: Datos del clima
 */
weatherRouter.get('/weather', async (req, res) => {
  try {
    const processedData = await obtenerDatosClima();
    res.status(200).json({
      success: true,
      data: processedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Endpoint para obtener los datos del clima
/**
 * @swagger
 * /weather/proyeccion:
 *   post:
 *     summary: Genera una proyección basada en datos del clima
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoOperacion:
 *                 type: string
 *               material:
 *                 type: string
 *               toneladasTotales:
 *                 type: number
 *               fechaArribo:
 *                 type: string
 *               horaArribo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Proyección generada
 */
weatherRouter.post('/proyeccion', async (req, res) => {
  try {
    // Datos enviados por el frontend
    const { tipoOperacion, material, toneladasTotales, fechaArribo, horaArribo } = req.body;

    // Validar los datos aquí (con un middleware o manualmente)

    const processedData = await obtenerDatosClima();

    const programacionData = {
      tipoOperacion,
      material,
      toneladasTotales,
      fechaArribo,
      horaArribo,
    };

    const retornar = calcularResultados(programacionData, processedData);

    res.status(200).json({
      success: true,
      data: retornar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al generar la proyección en base a los datos del clima",
    });
  }
});

module.exports = weatherRouter;
