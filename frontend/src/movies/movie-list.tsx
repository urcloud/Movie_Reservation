import { Link } from 'wouter';
import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { mockMovies } from '../data/movies';

export const MoviesList = () => {


  return (
    <div>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
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
        >
          검색
        </Button>
      </form>

     
      {mockMovies.map((movie) => (
        <div 
          key={movie.movieId}
          className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'
        >
          <span className='flex items-center justify-center'>{movie.title}</span>
          <span className='flex items-center justify-center'>
            {movie.director}
          </span>
          <span className='flex items-center justify-center'>
            {movie.releaseDate}
          </span>
          <span className='flex gap-1 items-center'>
            {/* 수정 페이지로 이동 시 영화 ID를 함께 전달 */}
            <Link to={`/edit/${movie.movieId}`}>
              <Button
                type='button'
                className='bg-blue-500 w-20 h-16 p-2 rounded'
              >
                수정
              </Button>
            </Link>
            <Button type='button' className='bg-red-500 w-20 h-16 p-2 rounded'>
              영화
              <br />
              삭제
            </Button>
          </span>
        </div>
      ))}
      
    </div>
  );
};