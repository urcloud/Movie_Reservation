import { useState } from 'react';
import { Link } from 'wouter';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Button } from '../commons/button';
import { Input } from '../commons/input'; // ✅ 입력창 사용

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
  rating: string;
  posterUrl?: string;
}

export const MovieListPage = () => {
  const [tab, setTab] = useState<'상영중' | '상영예정'>('상영중');
  const [search, setSearch] = useState(''); // ✅ 검색 상태

  // 🎥 mock 데이터
  const nowShowing: Movie[] = [
    {
      id: 1,
      title: '범죄도시 5',
      genre: '액션',
      releaseDate: '2025-09-20',
      rating: '15세 이상 관람가',
      posterUrl: '/images/movie1.jpg',
    },
    {
      id: 2,
      title: '인사이드 아웃 3',
      genre: '애니메이션',
      releaseDate: '2025-10-01',
      rating: '전체 관람가',
      posterUrl: '/images/movie2.jpg',
    },
  ];

  const upcoming: Movie[] = [
    {
      id: 3,
      title: '아바타 3',
      genre: 'SF',
      releaseDate: '2025-12-25',
      rating: '12세 이상 관람가',
      posterUrl: '/images/movie3.jpg',
    },
    {
      id: 4,
      title: '듄 3',
      genre: 'SF',
      releaseDate: '2026-01-10',
      rating: '15세 이상 관람가',
      posterUrl: '/images/movie4.jpg',
    },
  ];

  const movies = tab === '상영중' ? nowShowing : upcoming;

  // ✅ 영화 제목으로만 필터링
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <ContentLayout>
        <h1 className="text-xl font-bold mb-4 text-center">🎬 영화 목록 조회</h1>

        {/* 검색창 */}
        <div className="flex justify-center gap-2 mb-4">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="영화 제목으로 검색"
            className="border border-gray-300 w-1/2 px-3 py-2 rounded"
          />
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setSearch(search.trim())}
          >
            검색
          </Button>
        </div>

        {/* 탭 선택 */}
        <div className="flex justify-center gap-6 mb-6">
          {['상영중', '상영예정'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as '상영중' | '상영예정')}
              className={`px-4 py-2 border-b-2 ${
                tab === t ? 'border-blue-500 font-bold' : 'border-transparent'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 영화 카드 목록 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredMovies.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden"
              >
                {/* 포스터 */}
                <div className="relative w-full h-[300px] bg-gray-300 flex items-center justify-center">
                  {movie.posterUrl ? (
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-600">No Image</span>
                  )}
                </div>

                {/* 정보 */}
                <div className="flex flex-col flex-1 p-3 text-center">
                  <div className="flex justify-center items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{movie.title}</h3>
                    <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                      {movie.rating}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    {movie.genre} | {movie.releaseDate}
                  </p>

                  {/* 버튼 */}
                  <div className="flex justify-center gap-2 mt-auto">
                    <Link to={`/movielist/${movie.id}`}>
                      <Button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        상세보기
                      </Button>
                    </Link>
                    <Link to={`/booking/${movie.id}`}>
                      <Button className="bg-green-500 text-white px-3 py-1 rounded text-sm">
                        예매하기
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
