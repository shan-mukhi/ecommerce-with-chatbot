import express, { Router } from 'express';
import { registerController } from '../controllers/authController.js';
import { loginController,testController,forgotPasswordController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = Router();
//routing
router.post('/register',registerController)
router.post('/login',loginController)
router.post('/forgot-password',forgotPasswordController)
router.get('/test',requireSignIn,isAdmin,testController)
//private protected route
router.get('/dashboard',requireSignIn,(req,res)=>{
res.status(200).send({ok:true})

})



export default router;

