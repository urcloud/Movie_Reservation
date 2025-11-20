import express from 'express';
import authRouter from './auth/auth-route';
import theaterRouter from './theaters/theater-route';
import usersRouter from './users/users-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/theaters', theaterRouter);
router.use('/users', usersRouter);

export default router;
