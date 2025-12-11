import express from 'express';
import { getHome } from './home-ctrl';
const router = express.Router();

router.route('/home').get(getHome);

export default router;