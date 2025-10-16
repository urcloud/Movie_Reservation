import { Link } from 'wouter';
import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { mockMovies } from '../data/movies';
import { useState } from 'react';
import { Modal } from '../commons/modal';

export const MoviesList = () => {
  const GoBack = () => {
    window.history.back();
  };
  const handleClick = () => {
    alert('삭제되었습니다.');
    window.location.href = '/movies';
  };
  const movieSearch = () => {
    alert('검색되었습니다.');
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={GoBack}
      >
        이전화면
      </Button>
      <form className='flex flex-col gap-4 p-4 m-30 max-w-md mx-auto'>
        <Link to='/register'>
          <Button
            type='button'
            className='absolute top-2 left-2 bg-gray-500 p-2 rounded'
          >
            영화등록
          </Button>
        </Link>
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='영화명'
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='감독명'
        />
        <Button
          type='button'
          className=' top-2 right-2 bg-gray-500 p-2 rounded'
          onClick={movieSearch}
        >
          검색
        </Button>
      </form>

      <div className='flex w-full h-12 mt-4 bg-gray-400 border border-black font-bold'>
        <span className='w-1/4 flex items-center justify-center'>제목</span>
        <span className='w-1/4 flex items-center justify-center'>감독</span>
        <span className='w-1/4 flex items-center justify-center'>개봉일</span>
        <span className='w-1/4 flex items-center justify-center'>관리</span>
      </div>

      {mockMovies.map((movie) => (
        <div
          key={movie.id}
          className='flex w-full h-20 bg-gray-300 border border-black'
        >
          {/* 각 span에 너비 25%씩 할당 */}
          <span className='w-1/4 flex items-center justify-center'>
            {movie.title}
          </span>
          <span className='w-1/4 flex items-center justify-center'>
            {movie.director}
          </span>
          <span className='w-1/4 flex items-center justify-center'>
            {movie.releaseDate}
          </span>
          <span className='w-1/4 flex gap-1 items-center justify-center'>
            <Link to={`/edit/${movie.id}`} state={movie}>
              <Button
                type='button'
                className='bg-blue-500 w-20 h-16 p-2 rounded'
              >
                수정
              </Button>
            </Link>
            <Button
              type='button'
              className='bg-gray-500 w-20 h-16 p-2 rounded'
              onClick={() => setShowModal(true)}
            >
              영화
              <br />
              삭제
            </Button>
            {showModal && (
              <Modal onClose={() => setShowModal(false)}>
                <div>삭제하시겠습니까?</div>
                <Button type='button' className='w-1/2' onClick={handleClick}>
                  삭제
                </Button>
              </Modal>
            )}
          </span>
        </div>
      ))}
    </div>
  );
};
