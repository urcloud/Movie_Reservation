import express from 'express';
import authRouter from './auth/auth-route';
import screenRouter from './screening/screening-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/screening', screenRouter);

export default router;
