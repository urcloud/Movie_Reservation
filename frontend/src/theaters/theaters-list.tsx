import { Link } from 'wouter';
import { Button } from '../commons/button';


const theaterData = [
  { id: 1, name: '1관', seats: 150 },
  { id: 2, name: '2관',  seats: 120 },
];

export const TheaterList = () => {
  return (
    <div>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={() => window.history.back()}
      >
        이전화면
      </Button>

      <form className='flex flex-col gap-4 p-4 mt-20 max-w-md mx-auto'>
        <Link to='/register'>
          <Button
            type='button'
            className='absolute top-2 left-2 bg-gray-500 p-2 rounded'
          >
            상영관 등록
          </Button>
        </Link>

      </form>

      {theaterData.map((theater) => (
        <div
          key={theater.id}
          className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'
        >
          <span className='flex items-center justify-center w-1/4'>
            {theater.name}
          </span>
      
          <span className='flex items-center justify-center w-1/4'>
            {theater.seats}석
          </span>
          <span className='flex gap-1'>
           <Link to={`/${theater.id}`}>
              <Button
                type='button'
                className='bg-green-500 w-20 h-20 p-2 rounded'
              >
                조회
              </Button>
            </Link>
            <Link to={`/edit/${theater.id}`}>
              <Button
                type='button'
                className='bg-blue-500 w-20 h-20 p-2 rounded'
              >
                수정
              </Button>
            </Link>
            <Button type='button' className='bg-gray-500 w-20 h-20 p-2 rounded'>
              삭제
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};
