import express from 'express';
import authRouter from './auth/auth-route';
import theaterRouter from './theaters/theater-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/theaters', theaterRouter);

export default router;
