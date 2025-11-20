import express from 'express';
import authRouter from './auth/auth-route';
import usersRouter from './users/users-route';

const router = express.Router();
router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;