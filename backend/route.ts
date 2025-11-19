import express from 'express';
import authRouter from './auth/auth-route';
import screeningRouter from './screening/screening-route';
import movieRouter from './movies/movies-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/screening', screeningRouter);
router.use('/movies', movieRouter);

export default router;
