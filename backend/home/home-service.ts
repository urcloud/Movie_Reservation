import { HomeDB } from './home-db';
import type { MovieDTO } from './home-model';

/**
 * 홈 페이지 데이터 구성
 * - Top3 (랜덤 3개)
 * - 현재상영작 (랜덤 3개)
 * - 상영예정작 (랜덤 3개)
 */
export async function fetchHomePayload(): Promise<{
  top3: MovieDTO[];
  nowPlaying: MovieDTO[];
  comingSoon: MovieDTO[];
}> {
  const [top3, nowPlaying, comingSoon] = await Promise.all([
    HomeDB.getTop3(),
    HomeDB.getNowPlaying(),
    HomeDB.getComingSoon(),
  ]);

  return { top3, nowPlaying, comingSoon };
}