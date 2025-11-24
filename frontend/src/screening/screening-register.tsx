import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { mockMovies } from '../data/movies';
import { useParams } from 'wouter';
import { useState } from 'react';

export const ScreeningRegister = () => {
  const GoBack = () => {
    window.history.back();
  };
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';

  const params = useParams();
  const currentMovieId = Number(params.id);
  const movie = mockMovies.find((m) => m.id === currentMovieId);
  const movieTitle = movie
    ? movie.title
    : '영화 제목 불러오기 실패! 다시 시도해주세요';

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
      movieid: currentMovieId,
      theaterid: Number(theaterId),
      screeningdate: screeningDate,
      starttime: startTime,
      endtime: endTime,
      ticketprice: Number(ticketPrice),
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
        window.location.href = `/screenings`;
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
          {/* 상영관 데이터 부재로 하드 코딩 */}
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