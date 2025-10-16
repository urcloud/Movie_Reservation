import { useState } from 'react';
import { Button } from '../commons/button';
import { Input } from '../commons/input';

export const TheaterEdit = () => {
  console.log('history.state', history.state);
  const [theater, setTheater] = useState(history.state);
  // const { id, name, rows, cols, seats } = history.state;
  console.log('theater', theater);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log('theater after submit', [...formData]);
    history.back();
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

      <form
        onSubmit={handleSubmit}
        className='flex flex-col mt-20 gap-4 p-4 max-w-md mx-auto'
      >
        <Input
          type='text'
          name='name'
          className='border border-gray-300'
          defaultValue={theater.name}
        />
        <Input
          type='number'
          name='cols'
          className='border border-gray-300'
          defaultValue={theater.cols}
        />
        <Input
          type='number'
          name='rows'
          className='border border-gray-300'
          defaultValue={theater.rows}
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
