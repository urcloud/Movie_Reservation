import { ScreeningService, ScreeningSeatService, ReservationService, MovieService, TheaterService } from "../reservations/make-reservation-service";
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const getScreenings = async (req: Request, res: Response) => {
  try {
    const movieId = Number(req.query.movie_id);
    const rows = await ScreeningService.listByMovieId(movieId);
    res.json({ screenings: rows });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getScreeningById = async (req: Request, res: Response) => {
  try {
    const row = await ScreeningService.getById(Number(req.params.id));
    res.json({ screening: row });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getScreeningSeats = async (req: Request, res: Response) => {
  try {
    const seats = await ScreeningSeatService.listByScreeningId(
      Number(req.params.id)
    );
    res.json({ seats });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const auth = (req as any).auth;
    const email: string | undefined = auth?.email;

    if (!email) {
      return res
        .status(401)
        .json({ success: false, message: "로그인이 필요합니다." });
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
};

export const getScreeningMovie = async (req: Request, res: Response) => {
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
};

export const getScreeningTheater = async (req: Request, res: Response) => {
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
};