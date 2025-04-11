import { Router } from 'express';
import * as adminUserController from '../controllers/adminUserController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { ADMIN_USER_ROUTES } from '../constants/routes.constants';
import { validateAdminUserCreate, validateAdminUserUpdate } from '../middleware/validationMiddleware';

const router = Router();

router.use(authenticate, authorize);

router.post(ADMIN_USER_ROUTES.CREATE, validateAdminUserCreate, adminUserController.createAdminUser);
router.get(ADMIN_USER_ROUTES.GET_ALL, adminUserController.getAdminUsers);
router.get(ADMIN_USER_ROUTES.GET_BY_ID, adminUserController.getAdminUser);
router.put(ADMIN_USER_ROUTES.UPDATE, validateAdminUserUpdate, adminUserController.updateAdminUser);
router.delete(ADMIN_USER_ROUTES.DELETE, adminUserController.deleteAdminUser);

export default router;