import express from 'express';
import { homeRouter } from './home-ctrl';

const router = express.Router();

// /api 경로에 homeRouter 연결
router.use(homeRouter);

export default router;