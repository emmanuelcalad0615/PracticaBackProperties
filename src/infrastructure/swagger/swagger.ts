

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: 'API REST para gestión de propiedades inmobiliarias',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/infrastructure/swagger/docs/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);