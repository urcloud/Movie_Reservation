import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Button } from '../commons/button';
import { mockMovies } from '../data/movies';
import type { Movie } from '../models/movie';

export const MoviePayment = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [email, setEmail] = useState('');

  // localStorage에서 좌석 가져오기
  useEffect(() => {
    const seats = localStorage.getItem('selectedSeats');
    if (seats) {
      setSelectedSeats(JSON.parse(seats));
    }
  }, []);

  // mock 데이터에서 영화 정보 찾기
  useEffect(() => {
    const found = mockMovies.find((m) => m.id === Number(id));
    setMovie(found || null);
  }, [id]);

  const handleReservation = () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    alert(`예매 완료!\n영화: ${movie?.title}\n좌석: ${selectedSeats.join(', ')}`);
  };

  if (!movie) {
    return (
      <PageLayout>
        <ContentLayout>
          <p className="text-center mt-10 text-lg">영화 정보를 불러오는 중입니다...</p>
        </ContentLayout>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ContentLayout>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
          <h1 className="text-2xl font-bold mb-4">🎬 영화 예매 확인</h1>

          <div className="space-y-2 mb-6">
            <p>영화제목: <strong>{movie.title}</strong></p>
            <p>장르: {movie.genre}</p>
            <p>감독: {movie.director}</p>
            <p>주연: {movie.mainActor}</p>
            <p>상영 날짜: 2025-11-01</p>
            <p>상영 시간: 19:30</p>
            <p>선택 좌석: {selectedSeats.join(', ')}</p>
            <p>총 금액: {selectedSeats.length * 12000}원</p>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">
              🎟️ 영화 티켓 발급용 이메일을 입력해주세요 (필수)
            </label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-gray-700 font-medium">선택하셨습니다. 예매하시겠습니까?</p>
            <Button
              className="bg-blue-600 text-white px-6 py-2 rounded"
              onClick={handleReservation}
            >
              예매하기
            </Button>
          </div>
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
