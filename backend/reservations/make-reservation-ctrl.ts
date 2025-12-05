import express from "express";
import { ScreeningService, ScreeningSeatService, ReservationService, MovieService, TheaterService } from "../reservations/make-reservation-service";
import { requireLogin } from "../auth/auth-ctrl";

export const makeReservationRouter = express.Router();

makeReservationRouter.get("/screenings", async (req, res) => {
  try {
    const movieId = Number(req.query.movie_id);
    const rows = await ScreeningService.listByMovieId(movieId);
    res.json({ screenings: rows });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

makeReservationRouter.get("/screenings/:id", async (req, res) => {
  try {
    const row = await ScreeningService.getById(Number(req.params.id));
    res.json({ screening: row });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

makeReservationRouter.get("/screenings/:id/seats", async (req, res) => {
  try {
    const seats = await ScreeningSeatService.listByScreeningId(Number(req.params.id));
    res.json({ seats });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
});

makeReservationRouter.post("/reservations", requireLogin, async (req, res) => {
  try {
    const auth = (req as any).auth;
    const email: string | undefined = auth?.email;

    if (!email) {
      return res.status(401).json({ success: false, message: "로그인이 필요합니다." });
    }

    const result = await ReservationService.create({
      email,
      screening_seat_ids: req.body.screening_seat_ids,
    });

    res.status(201).json({ success: true, reservations: result });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      conflict_ids: err.conflict_ids || undefined,
    });
  }
});

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

makeReservationRouter.get("/screenings/:id/theater", async (req, res) => {
  try {
    const screeningId = Number(req.params.id);
    const screening = await ScreeningService.getById(screeningId);
    const theater = await TheaterService.getById(screening.theater_id);
    res.json({ theater });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
});