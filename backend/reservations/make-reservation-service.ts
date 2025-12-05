import { query } from "../dbs/database";
import { Repository } from "../reservations/make-reservation-db";

export const ScreeningService = {
  async listByMovieId(movieId: number) {
    if (!movieId) throw { statusCode: 400, message: "movie_id required" };
    return await Repository.findScreeningsByMovieId(movieId);
  },

  async getById(id: number) {
    if (!id) throw { statusCode: 400, message: "id required" };
    const row = await Repository.findScreeningById(id);
    if (!row) throw { statusCode: 404, message: "screening not found" };
    return row;
  },
};

export const ScreeningSeatService = {
  async listByScreeningId(screeningId: number) {
    if (!screeningId) throw { statusCode: 400, message: "screening_id required" };
    return await Repository.findScreeningSeats(screeningId);
  },
};

export const ReservationService = {
  async create(body: any) {
    const { email, screening_seat_ids } = body;

    if (!email) throw { statusCode: 400, message: "email required" };
    if (!Array.isArray(screening_seat_ids) || screening_seat_ids.length === 0)
      throw { statusCode: 400, message: "screening_seat_ids required" };

    const ids = screening_seat_ids.map(Number);

    await query("BEGIN");
    try {
      const conflicts = await Repository.findReservedSeats(ids);
      if (conflicts.length > 0) {
        await query("ROLLBACK");
        throw { statusCode: 409, message: "Seat already reserved", conflict_ids: conflicts };
      }

      const updated = await Repository.markSeatsReserved(ids);
      if (updated !== ids.length) {
        await Repository.markSeatsUnreserved(ids);
        await query("ROLLBACK");
        throw { statusCode: 409, message: "Concurrent seat locking failed" };
      }

      const reservations = await Repository.createReservations(email, ids);
      await query("COMMIT");
      return reservations;
    } catch (err) {
      await query("ROLLBACK");
      throw err;
    }
  },
};

export const MovieService = {
  async getById(movieId: number) {
    if (!movieId) throw { statusCode: 400, message: "movie_id required" };

    const movie = await Repository.findMovieById(movieId);
    if (!movie) throw { statusCode: 404, message: "movie not found" };

    return movie;
  },
};

export const TheaterService = {
  async getById(theaterId: number) {
    if (!theaterId) throw { statusCode: 400, message: "theater_id required" };

    const theater = await Repository.findTheaterById(theaterId);
    if (!theater) throw { statusCode: 404, message: "theater not found" };

    return theater;
  }
};