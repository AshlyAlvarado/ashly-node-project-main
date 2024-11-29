const express = require('express');
const axios = require('axios');
const calcularResultados = require('./calculoService');
const router = express.Router();

// Define la URL de la API externa
const WEATHER_API_URL = `https://api.tomorrow.io/v4/weather/forecast?location=15.843449%2C%20-87.955261&timesteps=hourly&apikey=${process.env.CLIMA_API_KEY}`;

// Endpoint para obtener los datos del clima
router.get('/weather', async (req, res) => {
  try {
    // Realiza la solicitud a la API externa
    const response = await axios.get(WEATHER_API_URL);

    // Extrae los datos necesarios de la respuesta
    const timelines = response.data.timelines;
    const hourlyData = timelines.hourly; // Datos por hora

    const processedData = hourlyData.map(entry => ({
        time: entry.time,
        rainAccumulation: entry.values.rainAccumulation,
      }));

    // Devuelve los datos como respuesta
    res.status(200).json({
      success: true,
      data: processedData,
    });

  } catch (error) {
    console.error("Error al obtener datos del clima:", error.message);

    // Devuelve un error en caso de fallo
    res.status(500).json({
      success: false,
      message: "Error al obtener datos del clima",
    });
  }
});

// Endpoint para obtener los datos del clima
router.get('/proyeccion', async (req, res) => {
  try {
    const response = await axios.get(WEATHER_API_URL);
    
    const timelines = response.data.timelines;
    const hourlyData = timelines.hourly; // Datos por hora

    const processedData = hourlyData.map(entry => ({
      time: entry.time,
      rainAccumulation: entry.values.rainAccumulation,
    }));

    const programacionData = {
      tipoOperacion: "importacion",
      material:"Carbon",
      toneladasTotales:9000,
      fechaArribo:"2024-11-29",
      horaArribo:"00:00"
    }

    const retornar = calcularResultados(programacionData, processedData)

    res.status(200).json({
      success: true,
      data: retornar,
    });
  } catch (error) {
    console.error("Error al obtener datos del clima:", error.message);

    res.status(500).json({
      success: false,
      message: "Error al generar la proyección en base a los datos del clima",
    });
  }
});

module.exports = router;
