// src/reservations/res_model.ts

// DB 쿼리에서 받아오는 행 모양 (rows[i])
export type ReservationRow = {
  id: number;
  movie: string;
  date: string;
  time: string;
  theater: string;
  seat: string;
  reservation_status: 'CONFIRMED' | 'CANCELED';
  created_at: string;
  email: string;
};

// 프론트에 넘겨줄 예매 모델
export type Reservation = {
  id: number;
  movie: string;
  date: string;
  time: string;
  theater: string;
  seat: string;
  status: 'CONFIRMED' | 'CANCELED';
  createdAt: string;
  email?: string;
};

// Row → Reservation 변환 헬퍼
export const mapRowToReservation = (row: ReservationRow): Reservation => ({
  id: row.id,
  movie: row.movie,
  date: row.date,
  time: row.time,
  theater: row.theater,
  seat: row.seat,
  status: row.reservation_status,
  createdAt: row.created_at,
  email: row.email,
});
