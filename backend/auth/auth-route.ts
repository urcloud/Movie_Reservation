import express from 'express';
import { getUser, login, logout, signup } from './auth-ctrl';
const router = express.Router();

router.route('/getUser').get(getUser);
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/logout').post(logout);

export default router;
