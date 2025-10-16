import { Button } from '../commons/button';
import { Input } from '../commons/input';

export const TheaterEdit = () => {
  return (
    <div>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={() => window.history.back()}
      >
        이전화면
      </Button>

      <form className='flex flex-col mt-20 gap-4 p-4 max-w-md mx-auto'>
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='상영관 이름 수정'
        />
        <Input
          type='number'
          className='border border-gray-300'
          placeholder='좌석 열 수정'
        />
        <Input
          type='number'
          className='border border-gray-300'
          placeholder='좌석 행 수정'
        />
      
    

        <Button type='submit' className='bg-gray-500 p-2 rounded'>
          수정
        </Button>
        <Button type='submit' className='bg-gray-500 p-2 rounded'>
          삭제
        </Button>
      </form>
    </div>
  );
};
