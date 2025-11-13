import express from 'express';
import authRouter from './auth/auth-route';
import reservationsRouter from './reservations/res-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/reservations', reservationsRouter);

export default router;
