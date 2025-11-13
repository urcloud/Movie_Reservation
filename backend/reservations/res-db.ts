import { db } from '../dbs';

// 프론트의 ReservItem 모양 그대로
export type ReservItem = {
  id: string;
  movie: string;
  date: string;
  time: string;
  theater: string;
  seat: string;
  reservation_status?: 'CONFIRMED' | 'CANCELED';
  created_at?: string;
};

export const listReservationsByEmail = async (
  email: string,
): Promise<ReservItem[]> => {
  const sql = `
    SELECT 
      r.id,
      m.title AS movie,
      to_char(s.screening_date, 'YYYY-MM-DD') AS date,
      to_char(s.start_time, 'HH24:MI') AS time,
      t.theater_name AS theater,
      se.seat_number AS seat,
      r.reservation_status,
      r.created_at
    FROM reservation r
    JOIN screening s ON r.screening_id = s.id
    JOIN movie m     ON s.movie_id = m.id
    JOIN theater t   ON r.theater_id = t.id
    JOIN seat se     ON r.seat_id = se.id
    WHERE r.email = $1
    ORDER BY r.created_at DESC
  `;
  const result = await db.query(sql, [email]);
  // result.rows 안의 컬럼 이름을 ReservItem 타입으로 변환
  return result.rows.map((r: any) => ({
    id: String(r.id),
    movie: r.movie,
    date: r.date,
    time: r.time,
    theater: r.theater,
    seat: r.seat,
    reservation_status: r.reservation_status,
    created_at: r.created_at?.toISOString?.() ?? undefined,
  }));
};

export const getReservationById = async (
  id: number,
): Promise<ReservItem | null> => {
  const sql = `
    SELECT 
      r.id,
      m.title AS movie,
      to_char(s.screening_date, 'YYYY-MM-DD') AS date,
      to_char(s.start_time, 'HH24:MI') AS time,
      t.theater_name AS theater,
      se.seat_number AS seat,
      r.reservation_status,
      r.created_at,
      r.modified_at,
      r.email
    FROM reservation r
    JOIN screening s ON r.screening_id = s.id
    JOIN movie m     ON s.movie_id = m.id
    JOIN theater t   ON r.theater_id = t.id
    JOIN seat se     ON r.seat_id = se.id
    WHERE r.id = $1
  `;
  const result = await db.query(sql, [id]);
  const r = result.rows[0];
  if (!r) return null;
  return {
    id: String(r.id),
    movie: r.movie,
    date: r.date,
    time: r.time,
    theater: r.theater,
    seat: r.seat,
    reservation_status: r.reservation_status,
    created_at: r.created_at?.toISOString?.(),
  };
};
