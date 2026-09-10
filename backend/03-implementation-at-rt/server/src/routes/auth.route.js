import {Router} from 'express';
import { authMeController, authRefreshController, authRegisterController } from '../controller/auth.controller.js';

const router = Router();

router.post('/register', authRegisterController);

router.get('/me', authMeController);

router.post('/refresh', authRefreshController);

export default router;
