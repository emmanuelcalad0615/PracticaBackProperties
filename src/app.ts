import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import router from './interfaces/routes/index';
import { errorHandler } from './infrastructure/middlewares/errorHandler';
import { swaggerSpec } from './infrastructure/swagger/swagger';

dotenv.config();

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/v1', router);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación en http://localhost:${PORT}/api/docs`);
});

export default app;