import { Button } from '../commons/button';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Modal } from '../commons/modal';


const formatLocalDate = (dateString: string) => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};
const formatTime = (timeString: string) => {
  if (!timeString) return '';

  return timeString.substring(0, 5); 
};

export const ScreeningManage = () => {
  const params = useParams();
  const currentMovieId = Number(params.id);

  const [screenings, setScreenings] = useState<any[]>([]);
  const [movieTitle, setMovieTitle] = useState('로딩 중...');

  const [modalForScreeningId, setModalForScreeningId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await fetch(`/api/movie/${currentMovieId}`);
        if (movieRes.ok) {
          const movieData = await movieRes.json();
          setMovieTitle(movieData.title);
        } else {
          setMovieTitle('영화 정보를 찾을 수 없습니다.');
        }

        const screeningRes = await fetch(`/api/screening?movie_id=${currentMovieId}`);
        if (screeningRes.ok) {
          const screeningData = await screeningRes.json();
          setScreenings(screeningData);
        }
      } catch (error) {
        console.error('데이터 로딩 에러:', error);
      }
    };

    fetchData();
  }, [currentMovieId]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/screening/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        setScreenings((prev) => prev.filter((s) => s.id !== id));
      } else {
        const result = await response.json();
        alert(`삭제 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('삭제 중 에러:', error);
      alert('오류가 발생했습니다.');
    }
  };

  const GoBack = () => {
    window.history.back();
  };

  return (
    <div className='relative pt-20 bg-gray-50 min-h-screen'>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
        onClick={GoBack}
      >
        이전화면
      </Button>
      <h1 className='text-2xl font-bold text-center mb-4'>
        "{movieTitle}" 상영 정보
      </h1>
      
      <div className='max-w-md mx-auto flex flex-col gap-4 p-4'>
        {screenings.length === 0 ? (
          <div className='text-center text-gray-500 py-10'>등록된 상영 정보가 없습니다.</div>
        ) : (
          screenings.map((screening) => (
            <div
              key={screening.id} 
              className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
            >
              <p className='font-semibold text-lg text-gray-800'>
                상영관: {screening.theater_id}관
              </p>
              <p className='text-gray-600'>
                상영일자: {formatLocalDate(screening.screening_date)}
              </p>
              <p className='text-gray-600'>
                상영 시작 시간: {formatTime(screening.start_time)}
              </p>
              <p className='text-gray-600'>
                상영 종료 시간: {formatTime(screening.end_time)}
              </p>
              <p className='text-gray-600'>가격: {Number(screening.ticket_price).toLocaleString()}원</p>

              <span className='flex gap-1 items-center justify-end mt-4'>
                <Link to={`/edit/${currentMovieId}`} state={{ ...screening, movieId: currentMovieId }}>
                  <Button
                    type='button'
                    className='bg-gray-200 text-gray-800 w-20 h-16 p-2 rounded hover:bg-gray-300'
                  >
                    수정
                  </Button>
                </Link>
                <Button
                  type='button'
                  className='bg-gray-300 text-gray-800 w-20 h-16 p-2 rounded hover:bg-gray-400'
                  onClick={() => setModalForScreeningId(screening.id)}
                >
                  정보
                  <br />
                  삭제
                </Button>
              </span>
            </div>
          ))
        )}

        <Link to={`/register/${currentMovieId}`}>
          <Button
            type='button'
            className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          >
            상영정보 등록
          </Button>
        </Link>
      </div>
      
      {modalForScreeningId !== null && (
        <Modal onClose={() => setModalForScreeningId(null)}>
          <div>삭제하시겠습니까?</div>
          <Button
            type='button'
            className='w-1/2'
            onClick={() => {
              handleDelete(modalForScreeningId!);
              setModalForScreeningId(null);
            }}
          >
            삭제
          </Button>
        </Modal>
      )}
    </div>
  );
};