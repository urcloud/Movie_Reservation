import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { mockMovies } from '../data/movies';
import { useParams } from 'wouter';

export const ScreeningRegister = () => {
  const GoBack = () => {
    window.history.back();
  };
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';

  const handleClick = () => {
    alert('등록되었습니다.');
    window.location.href = '/screenings';
  };

  const params = useParams();
  const currentMovieId = Number(params.id);
  const movie = mockMovies.find((m) => m.id === currentMovieId);
  const movieTitle = movie
    ? movie.title
    : '영화 제목 불러오기 실패! 다시 시도해주세요';

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
        <select className='border border-gray-300' required>
          {' '}
          {/* 상영관 데이터 부재로 하드 코딩 */}
          <option value='1'>1관</option>
          <option value='2'>2관</option>
          <option value='3'>3관</option>
          <option value='4'>4관</option>
          <option value='5'>5관</option>
          <option value='6'>6관</option>
          <option value='7'>7관</option>
          <option value='8'>8관</option>
          <option value='9'>9관</option>
          <option value='10'>10관</option>
        </select>
        <label className={labelStyle}>상영일 선택</label>
        <Input type='date' className='border border-gray-300' required />
        <label className={labelStyle}>상영 시작 시간 선택</label>
        <Input type='time' className='border border-gray-300' required />
        <label className={labelStyle}>상영 종료 시간 선택</label>
        <Input type='time' className='border border-gray-300' required />
        <label className={labelStyle}>티켓 가격</label>

        <Input
          type='number'
          className='border border-gray-300'
          placeholder='가격을 입력하세요'
          required
        />

        <Button
          type='button'
          className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          onClick={handleClick}
        >
          등록
        </Button>
      </form>
    </div>
  );
};
