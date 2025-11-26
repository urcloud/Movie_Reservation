import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState, useEffect } from 'react';
import { Modal } from '../commons/modal';

const formatToDate = (isoString: string | Date) => {
  if (!isoString) return '';
  const dateStr = isoString instanceof Date ? isoString.toISOString() : isoString;
  return dateStr.split('T')[0];
};

//Date와 Time을 합치는 함수 추가
const combineDateAndTime = (dateIso: string, timeStr: string) => {
  if (!dateIso || !timeStr) return '';
  const cleanDate = dateIso.split('T')[0];
  const cleanTime = timeStr.substring(0, 5);
  return `${cleanDate}T${cleanTime}`;
};

export const ScreeningEdit = () => {
  const GoBack = () => {
    window.history.back();
  };
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';
  const [screening] = history.state ? [history.state] : [{ screening: null }];
  const targetMovieId = screening ? Number(screening.movie_id) : 0;
  const [movieTitle, setMovieTitle] = useState('');

  useEffect(() => {
    if (!targetMovieId) return;
    fetch(`/api/movie/${targetMovieId}`)
      .then(res => res.json())
      .then(data => setMovieTitle(data.title))
      .catch(() => setMovieTitle('영화 정보 없음'));
  }, [targetMovieId]);

  const [showModal, setShowModal] = useState(false);

  const [theaterId, setTheaterId] = useState(screening?.theater_id || '');
  const [screeningDate, setScreeningDate] = useState(formatToDate(screening?.screening_date));
  
  const [startTime, setStartTime] = useState(
    screening ? combineDateAndTime(screening.screening_date, screening.start_time) : ''
  );
  const [endTime, setEndTime] = useState(
    screening ? combineDateAndTime(screening.screening_date, screening.end_time) : ''
  );
  
  const [ticketPrice, setTicketPrice] = useState(screening?.ticket_price || '');

  const handleDelete = async () => {
    const idToDelete = screening.id || screening.screening_id;
    if (!idToDelete) return;

    try {
      const response = await fetch(`/api/screening/${idToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        window.location.href = `/screening/manage/${targetMovieId}`;
      } else {
        const result = await response.json();
        alert(`삭제 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };

  const handleUpdate = async () => {
    const idToUpdate = screening.id || screening.screening_id;
    if (!idToUpdate) {
      alert('잘못된 접근입니다.');
      return;
    }
    const extractTime = (dt: string) => {
        if(dt.includes('T')) return dt.split('T')[1];
        return dt; 
    };

    const payload = {
      theater_id: Number(theaterId),
      screening_date: screeningDate,
      start_time: extractTime(startTime),
      end_time: extractTime(endTime),
      ticket_price: Number(ticketPrice),
    };

    try {
      const response = await fetch(`/api/screening/${idToUpdate}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('수정되었습니다.');
        window.location.href = `/screening/manage/${targetMovieId}`;
      } else {
        const result = await response.json();
        alert(`수정 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };

  if (!screening) {
    return <div className='pt-20 text-center'>상영 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <div className='relative pt-20'>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
        onClick={GoBack}
      >
        이전화면
      </Button>
      <form className='flex flex-col gap-4 p-4 max-w-md mx-auto'>
        <h1 className='text-2xl font-bold text-center mb-4'>"{movieTitle}" 상영 정보 수정</h1>
        
        <div>
          <label htmlFor='theater' className={labelStyle}>상영관</label>
          <Input
            id='theater'
            type='number'
            className='border border-gray-300 w-full bg-gray-100'
            value={theaterId}
            onChange={(e) => setTheaterId(e.target.value)}
            readOnly
          />
        </div>

        <div>
          <label htmlFor='screeningDate' className={labelStyle}>상영일자</label>
          <Input
            id='screeningDate'
            type='date'
            className='border border-gray-300 w-full'
            value={screeningDate}
            onChange={(e) => setScreeningDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='screening.startTime' className={labelStyle}>상영 시작 시간</label>
          <Input
            id='screening.startTime'
            type='datetime-local'
            className='border border-gray-300 w-full'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='screening.endTime' className={labelStyle}>상영 종료 시간</label>
          <Input
            id='screening.endTime'
            type='datetime-local'
            className='border border-gray-300 w-full'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='ticketPrice' className={labelStyle}>티켓 가격(원)</label>
          <Input
            id='ticketPrice'
            type='number'
            className='border border-gray-300 w-full'
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />
        </div>
      
        <Button 
          type='button'
          className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          onClick={handleUpdate}
        >
          수정
        </Button>
        <Button
          type='button'
          className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          onClick={() => setShowModal(true)}
        >
          영화 삭제
        </Button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div>삭제하시겠습니까?</div>
            <Button type='button' className='w-1/2' onClick={handleDelete}>
              삭제
            </Button>
          </Modal>
        )}
      </form>
    </div>
  );
};