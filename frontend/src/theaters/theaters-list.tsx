import { Link } from 'wouter';
import { Button } from '../commons/button';
import { useState, useEffect } from 'react';

interface Theater {
  theaterId: number;
  theaterName: string;
  rows: number;
  cols: number;
  totalSeats: number;
}

export const TheaterList = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);

  // 목록
  useEffect(() => {
    fetch('/api/theaters')
      .then((res) => res.json())
      .then((data) => setTheaters(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  // 삭제 핸들러
  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/theaters/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTheaters(theaters.filter((t) => t.theaterId !== id));
      } else {
        const errorData = await res.json();
        alert(`삭제 실패: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={() => window.history.back()}
      >
        이전화면
      </Button>

      <div className='flex flex-col gap-4 p-4 mt-20 max-w-md mx-auto'>
        <Link to='/register'>
          <Button
            type='button'
            className='absolute top-2 left-2 bg-gray-500 p-2 rounded'
          >
            상영관 등록
          </Button>
        </Link>
      </div>

    
      {theaters.map((theater) => (
        <div
          key={theater.theaterId}
          className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'
        >
          <span className='flex items-center justify-center w-1/4'>
            {theater.theaterName}
          </span>

          <span className='flex items-center justify-center w-1/4'>
            {theater.totalSeats}석
          </span>
          <span className='flex gap-1 items-center'>
            <Link to={`/${theater.theaterId}`}>
              <Button
                type='button'
                className='bg-green-500 w-20 h-20 p-2 rounded'
              >
                조회
              </Button>
            </Link>
            <Link to={`/edit/${theater.theaterId}`} state={theater}>
              <Button
                type='button'
                className='bg-blue-500 w-20 h-20 p-2 rounded'
              >
                수정
              </Button>
            </Link>
            <Button
              type='button'
              onClick={() => handleDelete(theater.theaterId)}
              className='bg-gray-500 w-20 h-20 p-2 rounded'
            >
              삭제
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};