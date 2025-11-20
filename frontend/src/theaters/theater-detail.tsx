import { Button } from '../commons/button';
import { SeatMap } from './seat-map';
import { Link, useRoute } from 'wouter';
import { useEffect, useState } from 'react';

interface TheaterDetailType {
  theaterId: number;
  theaterName: string;
  rows: number;
  cols: number;
  totalSeats: number;
  seats?: any[];
}

export const TheaterDetail = () => {
  const [match, params] = useRoute('/:id');
  const theaterId = params ? Number(params.id) : null;
  const [theater, setTheater] = useState<TheaterDetailType | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (theaterId) {
      fetch(`/api/theaters/${theaterId}`)
        .then(async (res) => {
          if (!res.ok) throw new Error('상영관 정보를 찾을 수 없습니다.');
          return res.json();
        })
        .then((data) => setTheater(data))
        .catch((err) => setError(err.message));
    }
  }, [theaterId]);

  if (!match || error || !theater) {
    return (
      <div className='p-4 max-w-md mx-auto mt-20 bg-gray-100 rounded shadow'>
        <h1 className='text-xl font-bold mb-4'>
          {error || '로딩 중...'} (ID: {theaterId})
        </h1>
        <Button
          type='button'
          className='bg-gray-500 p-2 rounded mt-4'
          onClick={() => window.history.back()}
        >
          이전화면
        </Button>
      </div>
    );
  }

  return (
    <div className='p-4 max-w-md mx-auto mt-20 bg-gray-100 rounded shadow'>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={() => window.history.back()}
      >
        이전화면
      </Button>

      <h1 className='text-xl font-bold mb-4'>{theater.theaterName}</h1>

      <p>총 좌석 수: {theater.totalSeats}석</p>
      <p>좌석 구조: {theater.rows}행 x {theater.cols}열</p>

      
      <SeatMap rows={theater.rows} cols={theater.cols} />

      <div className='mt-6 flex gap-2'>
        <Link to={`/edit/${theaterId}`} state={theater}>
          <Button className='bg-blue-500 p-2 rounded'>수정</Button>
        </Link>
        {}
      </div>
    </div>
  );
};