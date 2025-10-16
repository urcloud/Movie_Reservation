import { Link } from 'wouter';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Button } from '../commons/button';

interface Props {
  id: string;
}

// 🎥 임시로 쓸 mock 데이터 (나중에 DB 연결하면 fetch로 대체)
const mockMovies = [
  {
    id: 1,
    title: '범죄도시 5',
    genre: '액션',
    director: '이상용',
    cast: '마동석, 손석구',
    description: '괴물형사 마석도의 새로운 범죄 소탕 작전!',
    releaseDate: '2025-09-20',
    runningTime: '130분',
    rating: '15세 이상 관람가',
  },
  {
    id: 2,
    title: '인사이드 아웃 3',
    genre: '애니메이션',
    director: '피트 닥터',
    cast: '에이미 포엘러, 마야 루돌프',
    description: '새로운 감정이 찾아온 라일리의 이야기!',
    releaseDate: '2025-10-01',
    runningTime: '115분',
    rating: '전체 관람가',
  },
  {
    id: 3,
    title: '아바타 3',
    genre: 'SF',
    director: '제임스 카메론',
    cast: '샘 워싱턴, 조 샐다나',
    description: '판도라 행성의 새로운 종족과의 만남',
    releaseDate: '2025-12-25',
    runningTime: '150분',
    rating: '12세 이상 관람가',
  },
  {
    id: 4,
    title: '듄 3',
    genre: 'SF',
    director: '드니 빌뇌브',
    cast: '티모시 샬라메, 젠데이아',
    description: '폴 아트레이디스의 최후의 결단',
    releaseDate: '2026-01-10',
    runningTime: '160분',
    rating: '12세 이상 관람가',
  },
];

export const MovieDetailPage = ({ id }: Props) => {
  // 문자열 id → 숫자로 변환해서 비교
  const movie = mockMovies.find((m) => m.id === Number(id));

  // 해당 ID가 없을 때 예외 처리
  if (!movie) {
    return (
      <PageLayout>
        <ContentLayout>
          <div className='text-center text-red-500 mt-10'>
            ❌ 해당 영화를 찾을 수 없습니다.
          </div>
          <Link to='/movies'>
            <Button className='mt-4 bg-gray-500 text-white'>목록으로</Button>
          </Link>
        </ContentLayout>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ContentLayout>
        <div className='flex justify-between items-center mb-6'>
          <Link to='/movielist'>
            <Button className='bg-gray-500 text-white px-4 py-2 rounded'>
              목록으로
            </Button>
          </Link>
          <h1 className='text-2xl font-bold'>{movie.title}</h1>
        </div>

        <div className='flex gap-6'>
          {/* 왼쪽 포스터 */}
          <div className='w-1/3 h-[400px] bg-gray-300 flex items-center justify-center'>
            <span className='text-gray-600'>No Image</span>
          </div>

          {/* 오른쪽 상세 정보 */}
          <div className='flex-1 flex flex-col gap-2 text-gray-800'>
            <p>
              <strong>장르:</strong> {movie.genre}
            </p>
            <p>
              <strong>감독:</strong> {movie.director}
            </p>
            <p>
              <strong>주연:</strong> {movie.cast}
            </p>
            <p>
              <strong>개봉일:</strong> {movie.releaseDate}
            </p>
            <p>
              <strong>러닝타임:</strong> {movie.runningTime}
            </p>
            <p>
              <strong>관람등급:</strong> {movie.rating}
            </p>
            <p className='mt-4 text-gray-700 leading-relaxed'>
              {movie.description}
            </p>

            <Link to={`/booking/${movie.id}`}>
              <Button className='mt-6 bg-blue-500 text-white px-4 py-2 rounded'>
                예매하기
              </Button>
            </Link>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
