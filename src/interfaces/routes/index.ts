import { Router } from 'express';
import propertyRoutes from './propertyRoutes';
import authRoutes from './authRoutes';

const router = Router();

router.use('/properties', propertyRoutes);
router.use('/auth', authRoutes);

export default router;