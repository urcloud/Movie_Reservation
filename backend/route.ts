import express from 'express';
import authRouter from './auth/auth-route';
import homeRouter from './home/home-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use(homeRouter);

export default router;
