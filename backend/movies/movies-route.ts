import express from 'express';
import { getInfo } from './movies-ctrl';
const router = express.Router();

router.route('/').get(getInfo);

export default router;