import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../../infrastructure/middlewares/validate';
import { AuthSchema } from '../../infrastructure/middlewares/schemas/authSchemas';

const router = Router();
const controller = new AuthController();

router.post(
  '/register',
  validate(AuthSchema, 'body'),
  (req, res, next) => controller.register(req, res, next)
);

router.post(
  '/login',
  validate(AuthSchema, 'body'),
  (req, res, next) => controller.login(req, res, next)
);

export default router;