import express from 'express';
import {
  getMemberReservations,
  getReservationDetail,
} from './res-ctrl';

const router = express.Router();

// GET /api/reservations/member?email=foo@bar.com
router.route('/member').get(getMemberReservations);

// GET /api/reservations/:id
router.route('/:id').get(getReservationDetail);

export default router;
