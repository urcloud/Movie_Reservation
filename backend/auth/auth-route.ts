import express from 'express';
import { getUser, login, logout, requireLogin } from './auth-ctrl';
const router = express.Router();

router.route('/getUser').get(requireLogin, getUser);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;
