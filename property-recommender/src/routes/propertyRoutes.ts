import { Router } from 'express';
import { listProperties } from '../controllers/propertyController';

const router = Router();

router.get('/properties', listProperties);

export default router;