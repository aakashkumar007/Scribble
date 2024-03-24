import express, { application } from 'express'
import {registerController,loginController,forgotPasswordController, testController} from '../controllers/authController.js'
import { isAdmin,requireSignIn } from '../middleware/authMiddleWare.js';
const router = express.Router();



//METHOD POST //REGISTER
router.post('/register',registerController);

//METHOD POST //LOGIN
router.post("/login",loginController);

//Forgot Password
router.post('/forgot-password',forgotPasswordController);

//middleware route
router.get("/test",requireSignIn,isAdmin,testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //Admin Route
  router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });

export default router