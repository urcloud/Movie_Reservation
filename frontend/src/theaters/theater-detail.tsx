import { Button } from '../commons/button';

export const TheaterDetail = () => {
  const theater = {
    name: '1관',

    seats: 150,
    cols:10,
    rows:5,
  };

  return (
    <div className='p-4 max-w-md mx-auto mt-20 bg-gray-100 rounded shadow'>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={() => window.history.back()}
      >
        이전화면
      </Button>

      <h1 className='text-xl font-bold mb-4'>{theater.name}</h1>
     
      <p>좌석 수: {theater.seats}석</p>
      <p>좌석 열: {theater.cols}</p>
      <p>좌석 행: {theater.rows}</p>
      

      <div className='mt-6 flex gap-2'>
        <Button className='bg-blue-500 p-2 rounded'>수정</Button>
        <Button className='bg-gray-500 p-2 rounded'>삭제</Button>
      </div>
    </div>
  );
};
