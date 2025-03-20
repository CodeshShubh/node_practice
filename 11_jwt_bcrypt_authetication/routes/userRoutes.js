import express from 'express';
import { getmyProfile, Login, Logout, Register } from '../controllers/useControler.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/logout').get( Logout)
router.route('/getMyProfile').get(isAuthenticated, getmyProfile)



export default router;