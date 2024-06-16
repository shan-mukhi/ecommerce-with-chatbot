import express, { Router } from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController,testController } from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = Router();

//routing
router.post('/register',registerController)
router.post('/login',loginController)
router.get('/test',requireSignIn,isAdmin,testController)



export default router;

