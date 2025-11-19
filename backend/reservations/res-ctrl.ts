import { RequestHandler } from 'express';
import * as resDb from './res-db';

// 회원 예매 조회: GET /api/reservations/member?email=...
export const getMemberReservations: RequestHandler = async (req, res, next) => {
  try {
    const email = req.query.email as string | undefined;
    if (!email) {
      return res.status(400).json({ message: 'email 쿼리 파라미터가 필요합니다.' });
    }

    const items = await resDb.listReservationsByEmail(email);
    return res.json({ items });
  } catch (err) {
    next(err);
  }
};

// 비회원 예매 조회: POST /api/reservations/guest { email }
export const postGuestReservations: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as { email?: string };
    if (!email) {
      return res.status(400).json({ message: 'email 필드가 필요합니다.' });
    }

    const items = await resDb.listReservationsByEmail(email);
    return res.json({ items });
  } catch (err) {
    next(err);
  }
};

// 상세 조회: GET /api/reservations/:id
export const getReservationDetail: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'id는 숫자여야 합니다.' });
    }

    const detail = await resDb.getReservationById(id);
    if (!detail) {
      return res.status(404).json({ message: '예매 내역을 찾을 수 없습니다.' });
    }

    return res.json({ detail });
  } catch (err) {
    next(err);
  }
};
