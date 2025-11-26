import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useParams } from 'wouter';
import { useState, useEffect } from 'react';

export const ScreeningRegister = () => {
  const GoBack = () => {
    window.history.back();
  };
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';

  const params = useParams();
  const currentMovieId = Number(params.id);

  const [movieTitle, setMovieTitle] = useState('로딩 중...');
  
  useEffect(() => {
    const fetchMovieTitle = async () => {
      try {
        const response = await fetch(`/api/movie/${currentMovieId}`);
        if (response.ok) {
          const data = await response.json();
          setMovieTitle(data.title);
        } else {
          setMovieTitle('영화 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('영화 정보 로딩 에러:', error);
        setMovieTitle('영화 정보를 불러오는 중 오류 발생');
      }
    };
    fetchMovieTitle();
  }, [currentMovieId]);

  const [theaterId, setTheaterId] = useState('1');
  const [screeningDate, setScreeningDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');

  const handleRegister = async () => {
    if (!screeningDate || !startTime || !endTime || !ticketPrice) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    const payload = {
      movie_id: currentMovieId,         
      theater_id: Number(theaterId),     
      screening_date: screeningDate,     
      start_time: startTime,             
      end_time: endTime,                
      ticket_price: Number(ticketPrice),  
    };

    try {
      const response = await fetch('/api/screening', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('성공적으로 등록되었습니다.');
        window.location.href = `/screening/manage/${currentMovieId}`;
      } else {
        alert(`등록 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };

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
        <h1 className='text-2xl font-bold text-center mb-4'>
          "{movieTitle}" 상영 정보 등록
        </h1>

        <label className={labelStyle}>상영관 선택</label>
        <select
          className='border border-gray-300 p-2 rounded'
          required
          value={theaterId}
          onChange={(e) => setTheaterId(e.target.value)}
        >
          {/*현재 로컬 기준 DB에서 상영관 데이터 별도 추가 필요함*/}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}관
            </option>
          ))}
        </select>

        <label className={labelStyle}>상영일 선택</label>
        <Input
          type='date'
          className='border border-gray-300'
          required
          value={screeningDate}
          onChange={(e) => setScreeningDate(e.target.value)}
        />

        <label className={labelStyle}>상영 시작 시간 선택</label>
        <Input
          type='time'
          className='border border-gray-300'
          required
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label className={labelStyle}>상영 종료 시간 선택</label>
        <Input
          type='time'
          className='border border-gray-300'
          required
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <label className={labelStyle}>티켓 가격</label>
        <Input
          type='number'
          className='border border-gray-300'
          placeholder='가격을 입력하세요'
          required
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
        />

        <Button
          type='button'
          className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          onClick={handleRegister}
        >
          등록
        </Button>
      </form>
    </div>
  );
};