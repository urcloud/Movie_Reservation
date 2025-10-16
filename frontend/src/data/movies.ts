import type { Movie } from '../models/movie';

// 탭별 영화 데이터 (Mock Data)
export const tabData: Record<string, Movie[]> = {
  Top3: [
    { id: 1, title: 'Top1', genre: '액션', description: '영화소개1', director: '홍길동', cast: '김철수' },
    { id: 2, title: 'Top2', genre: '드라마', description: '영화소개2', director: '이영희', cast: '박영수' },
    { id: 3, title: 'Top3', genre: '코미디', description: '영화소개3', director: '최민수', cast: '정하늘' },
  ],
  nowPlaying: [
    { id: 4, title: '영화 A', genre: '액션', description: '소개 A', director: '감독 A', cast: '배우 A' },
    { id: 5, title: '영화 B', genre: '드라마', description: '소개 B', director: '감독 B', cast: '배우 B' },
    { id: 6, title: '영화 C', genre: '코미디', description: '소개 C', director: '감독 C', cast: '배우 C' },
  ],
  comingSoon: [
    { id: 7, title: '예정 1', genre: '액션', description: '소개 예정1', director: '감독 X', cast: '배우 X' },
    { id: 8, title: '예정 2', genre: '드라마', description: '소개 예정2', director: '감독 Y', cast: '배우 Y' },
    { id: 9, title: '예정 3', genre: '코미디', description: '소개 예정3', director: '감독 Z', cast: '배우 Z' },
  ],
};
