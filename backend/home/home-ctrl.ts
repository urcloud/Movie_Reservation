import { RequestHandler } from 'express';
import { fetchHomePayload } from './home-service';

/**
 * GET /api/home
 * 홈에 보여줄 요약 데이터 (Top3 / nowPlaying / comingSoon)
 */
export const getHome: RequestHandler = async (req, res) => {
  try {
    const payload = await fetchHomePayload();
    res.json({ ok: true, data: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '홈 데이터 불러오기 실패' });
  }
};