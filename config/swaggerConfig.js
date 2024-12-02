const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Material API',
      version: '1.0.0',
      description: 'API para gestionar materiales',
    },
    servers: [
      {
        url: 'http://localhost:4000/api', // URL base del servidor
      },
    ],
  },
  apis: ['./routes/*.js', './features/**/*.js'], // Ruta a los archivos que contienen las rutas
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log('📄 Documentación de API disponible en http://localhost:4000/api-docs');
};

module.exports = setupSwaggerDocs;
