import express from "express";
import { ScreeningService, ScreeningSeatService, ReservationService, MovieService } from "../reservations/make-reservation-service";

export const makeReservationRouter = express.Router();

// GET /api/screenings?movie_id=id
makeReservationRouter.get("/screenings", async (req, res) => {
  try {
    const movieId = Number(req.query.movie_id);
    const rows = await ScreeningService.listByMovieId(movieId);
    res.json({ screenings: rows });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

// GET /api/screenings/:id
makeReservationRouter.get("/screenings/:id", async (req, res) => {
  try {
    const row = await ScreeningService.getById(Number(req.params.id));
    res.json({ screening: row });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

// GET /api/screenings/:id/seats
makeReservationRouter.get("/screenings/:id/seats", async (req, res) => {
  try {
    const seats = await ScreeningSeatService.listByScreeningId(Number(req.params.id));
    res.json({ seats });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

// POST /api/reservations
makeReservationRouter.post("/reservations", async (req, res) => {
  try {
    const result = await ReservationService.create(req.body);
    res.status(201).json({ success: true, reservations: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      conflict_ids: err.conflict_ids || undefined,
    });
  }
});

// GET /api/screenings/:id/movie
makeReservationRouter.get("/screenings/:id/movie", async (req, res) => {
  try {
    const screeningId = Number(req.params.id);
    const screening = await ScreeningService.getById(screeningId);
    const movie = await MovieService.getById(screening.movie_id);
    res.json({ movie });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
});