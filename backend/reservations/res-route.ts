import express from 'express';
import {
  getMemberReservations,
  postGuestReservations,
  getReservationDetail,
} from './res-ctrl';
import { requireLogin } from '../auth/auth-ctrl'; 
const router = express.Router();

// 회원: 로그인 필수 + 로그인 정보(req.auth) 기반으로 조회
router.get('/member', requireLogin, getMemberReservations);

// 비회원 (POST)
router.post('/guest', postGuestReservations);

// 상세
router.get('/:id', getReservationDetail);

export default router;
