import { Router } from "express";
import { authLoginController, authMeController, authRefreshController, authRegisterController } from "../controller/auth.controller.js";

const router = Router();

/**
 * @POST /api/auth/register
 */
router.post('/register', authRegisterController);

/**
 * @GET /api/auth/me
 */
router.get('/me', authMeController);

/**
 * @GET /api/auth/me
 */
router.post('/refresh', authRefreshController);

/**
 * @POST /api/auth/login
 */
router.post('/login', authLoginController);

export default router;