import express from 'express';
import { getUser, login, logout } from './auth-ctrl';
const router = express.Router();

router.route('/getUser').get(getUser);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;
