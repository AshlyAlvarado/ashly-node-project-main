const express = require('express');
const axios = require('axios');
const router = express.Router();

// Define la URL de la API externa
const WEATHER_API_URL = "https://api.tomorrow.io/v4/weather/forecast?location=15.843449%2C%20-87.955261&timesteps=hourly&apikey=ZZSSCmVGBpuXIOs5pzUthMhLthsCkxBB";

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

module.exports = router;
