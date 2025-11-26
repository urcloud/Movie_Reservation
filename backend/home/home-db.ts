import { db } from '../dbs';
import { MovieDTO } from './home-model';

// 공통: 랜덤 3개 조회, 아직 좋아요나 리뷰가 구현이 되지 않음
const getRandomMovies = async (condition?: string): Promise<MovieDTO[]> => {
  const whereClause = condition ? `WHERE ${condition}` : '';
  const query = `
    SELECT 
      id,
      title,
      description,
      genre,
      director,
      main_actor,
      "release_date",
      "close_date",
      "running_time",
      "viewing_age"
    FROM "movie"
    ${whereClause}
    ORDER BY RANDOM()
    LIMIT 3;
  `;

  const result = await db.query(query);
  return result.rows as MovieDTO[];
};

export const HomeDB = {
  getTop3: async () => {
    // Top3는 현재상영작 중 랜덤 3개
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const condition = `"release_date" <= '${today}' AND "close_date" >= '${today}'`;
    return await getRandomMovies(condition);
  },

  getNowPlaying: async () => {
    // 현재상영작: 오늘 기준 releaseDate <= today <= closeDate
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const condition = `"release_date" <= '${today}' AND "close_date" >= '${today}'`;
    return await getRandomMovies(condition);
  },

  getComingSoon: async () => {
    // 상영예정작: 오늘 이후 releaseDate > today
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const condition = `"release_date" > '${today}'`;
    return await getRandomMovies(condition);
  },
};
