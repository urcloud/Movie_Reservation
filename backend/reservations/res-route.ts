// src/reservations/res-route.ts
import express from 'express';
import {
  getMemberReservations,
  postGuestReservations,
  getReservationDetail,
} from './res-ctrl';

const router = express.Router();

// 회원
router.get('/member', getMemberReservations);

// ✅ 비회원 (POST)
router.post('/guest', postGuestReservations);

// 상세
router.get('/:id', getReservationDetail);

export default router;
