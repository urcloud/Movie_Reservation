import express from 'express';
import authRouter from './auth/auth-route';
import theaterRouter from './theaters/theater-route';
import usersRouter from './users/users-route';
import screeningRouter from './screening/screening-route';
import movieRouter from './movies/movies-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/theaters', theaterRouter);
router.use('/users', usersRouter);
router.use('/screening', screeningRouter);
router.use('/movie', movieRouter);

export default router;
