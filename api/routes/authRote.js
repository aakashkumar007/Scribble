import express, { application } from 'express'
import {registerController,loginController, testController} from '../controllers/authController.js'
import { isAdmin,requireSignIn } from '../middleware/authMiddleWare.js';
const router = express.Router();



//METHOD POST //REGISTER
router.post('/register',registerController);

//METHOD POST //LOGIN
router.post("/login",loginController);

//middleware route
router.get("/test",requireSignIn,isAdmin,testController);

export default router