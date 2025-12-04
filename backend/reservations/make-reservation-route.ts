import express from 'express';
import { makeReservationRouter } from './make-reservation-ctrl';

const router = express.Router();

router.use(makeReservationRouter);

export default router;