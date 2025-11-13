import express from 'express';
import { getUser, login, logout, signup } from './screening-ctrl';
const router = express.Router();

router.route('/getUser').post(getUser);
router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/logout').post(logout);

export default router;