import { RequestHandler } from 'express';
import * as reservDb from './res-db';

// 1) 회원 예매 목록 조회: GET /api/reservations/member?email=xxx
export const getMemberReservations: RequestHandler = async (req, res, next) => {
  try {
    const email = req.query.email as string | undefined;

    if (!email) {
      return res.status(401).json({ message: 'email이 필요합니다.' });
    }

    const items = await reservDb.listReservationsByEmail(email);
    res.json({ items });
  } catch (err) {
    next(err);
  }
};

// 2) 예매 상세 조회: GET /api/reservations/:id
export const getReservationDetail: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(401).json({ message: 'id는 숫자여야 합니다.' });
    }

    const detail = await reservDb.getReservationById(id);
    if (!detail) {
      return res.status(404).json({ message: '예매 내역을 찾을 수 없습니다.' });
    }

    res.json({ detail });
  } catch (err) {
    next(err);
  }
};
