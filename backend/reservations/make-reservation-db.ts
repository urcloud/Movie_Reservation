import { query } from "../dbs/database";
import { Screening, ScreeningSeat, Reservation, Movie } from "../reservations/make-reservation-model";

export const Repository = {
  async findScreeningsByMovieId(movieId: number): Promise<Screening[]> {
    const text = `SELECT * FROM screening WHERE movie_id=$1 ORDER BY screening_date, start_time`;
    const result = await query<Screening>(text, [movieId]);
    return result.rows;
  },

  async findScreeningById(id: number): Promise<Screening | null> {
    const text = `SELECT * FROM screening WHERE id=$1`;
    const result = await query<Screening>(text, [id]);
    return result.rows[0] || null;
  },

  async findScreeningSeats(screeningId: number): Promise<ScreeningSeat[]> {
    const text = `SELECT * FROM screening_seat WHERE screening_id=$1 ORDER BY seat_id`;
    const result = await query<ScreeningSeat>(text, [screeningId]);
    return result.rows;
  },

  async findReservedSeats(screeningSeatIds: number[]): Promise<number[]> {
    if (screeningSeatIds.length === 0) return [];
    const placeholders = screeningSeatIds.map((_, i) => `$${i + 1}`).join(", ");
    const text = `SELECT screening_seat_id FROM reservation WHERE screening_seat_id IN (${placeholders}) AND reservation_status='CONFIRMED'`;
    const result = await query<{ screening_seat_id: number }>(text, screeningSeatIds);
    return result.rows.map(r => r.screening_seat_id);
  },

async markSeatsReserved(screeningSeatIds: number[]): Promise<number> {
  if (screeningSeatIds.length === 0) return 0;
  const placeholders = screeningSeatIds.map((_, i) => `$${i + 1}`).join(", ");
  const text = `UPDATE screening_seat 
                SET is_reserved=true 
                WHERE id IN (${placeholders}) AND is_reserved=false`;
  const result = await query(text, screeningSeatIds);
  return (result as any).rowCount;
},

async markSeatsUnreserved(screeningSeatIds: number[]): Promise<number> {
  if (screeningSeatIds.length === 0) return 0;
  const placeholders = screeningSeatIds.map((_, i) => `$${i + 1}`).join(", ");
  const text = `UPDATE screening_seat 
                SET is_reserved=false 
                WHERE id IN (${placeholders})`;
  const result = await query(text, screeningSeatIds);
  return (result as any).rowCount;
},

  async createReservations(email: string, screeningSeatIds: number[]): Promise<Reservation[]> {
    if (screeningSeatIds.length === 0) return [];
    const placeholders = screeningSeatIds.map((_, i) => `$${i + 1}`).join(", ");
    const selectText = `SELECT id AS seat_id, screening_id, theater_id FROM screening_seat WHERE id IN (${placeholders})`;
    const seatsResult = await query<{ seat_id: number; screening_id: number; theater_id: number }>(selectText, screeningSeatIds);
    const now = new Date().toISOString();

    const values: any[] = [];
    const valueStrings: string[] = [];
    seatsResult.rows.forEach((seat, idx) => {
      values.push(email, seat.seat_id, seat.seat_id, seat.screening_id, seat.theater_id, now);
      const baseIdx = idx * 6;
      valueStrings.push(`($${baseIdx + 1}, $${baseIdx + 2}, $${baseIdx + 3}, $${baseIdx + 4}, $${baseIdx + 5}, $${baseIdx + 6})`);
    });

    const insertText = `
      INSERT INTO reservation (email, screening_seat_id, seat_id, screening_id, theater_id, created_at)
      VALUES ${valueStrings.join(", ")}
      RETURNING *
    `;

    const result = await query<Reservation>(insertText, values);
    return result.rows;
  },

  async findMovieById(movieId: number): Promise<Movie | null> {
  const text = `SELECT * FROM movie WHERE id=$1`;
  const result = await query<Movie>(text, [movieId]);
  return result.rows[0] || null;
}
};
