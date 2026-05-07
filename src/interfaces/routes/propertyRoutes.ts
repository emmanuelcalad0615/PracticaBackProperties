
import { Router } from 'express';
import { PropertyController } from '../controllers/PropertyController';
import { authMiddleware } from '../../infrastructure/middlewares/authMiddleware';
import { validate } from '../../infrastructure/middlewares/validate';
import { PropertyBodySchema, ParamIdSchema, PropertyQuerySchema } from '../../infrastructure/middlewares/schemas/propertySchemas';

const router = Router();
const controller = new PropertyController();

// Rutas públicas
router.get(
  '/',
  validate(PropertyQuerySchema, 'query'),
  (req, res, next) => controller.getAll(req, res, next)
);

router.get(
  '/:id',
  validate(ParamIdSchema, 'params'),
  (req, res, next) => controller.getById(req, res, next)
);

// Rutas protegidas — requieren JWT
router.post(
  '/',
  authMiddleware,
  validate(PropertyBodySchema, 'body'),
  (req, res, next) => controller.create(req, res, next)
);

router.put(
  '/:id',
  authMiddleware,
  validate(ParamIdSchema, 'params'),
  validate(PropertyBodySchema.partial(), 'body'),
  (req, res, next) => controller.update(req, res, next)
);

router.delete(
  '/:id',
  authMiddleware,
  validate(ParamIdSchema, 'params'),
  (req, res, next) => controller.delete(req, res, next)
);

export default router;