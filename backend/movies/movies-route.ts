import express from 'express';
import { getInfo, movieRegister } from './movies-ctrl';
const router = express.Router();

router.route('/').get(getInfo);
router.route('/register').post(movieRegister);

export default router;