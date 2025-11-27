import express, { Request, Response, NextFunction } from 'express';
import { fetchHomePayload } from './home-service';

export const homeRouter = express.Router();

/**
 * GET /api/home
 * 홈에 보여줄 요약 데이터 (Top3 / nowPlaying / comingSoon)
 */
homeRouter.get('/home', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = await fetchHomePayload();
    res.json({ ok: true, data: payload });
  } catch (err) {
    next(err);
  }
});
