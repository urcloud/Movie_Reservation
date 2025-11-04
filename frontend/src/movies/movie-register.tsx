import { Button } from '../commons/button';
import { Input } from '../commons/input';

export const MovieRegister = () => {
  const GoBack = () => {
    window.history.back();
  };

  const handleClick = () => {
    alert('등록되었습니다.');
    window.location.href = '/movies';
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
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='영화명'
          required
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='감독명'
          required
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='주연배우'
          required
        />
        <Input
          type='date'
          className='border border-gray-300'
          placeholder='개봉일'
          required
        />
        <Input
          type='date'
          className='border border-gray-300'
          placeholder='상영 종료일'
          required
        />
        <Input
          type='number'
          className='border border-gray-300'
          placeholder='러닝타임'
          required
        />
        <Input
          type='number'
          className='border border-gray-300'
          placeholder='관람등급'
          required
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='장르'
          required
        />
        <textarea
          className='border border-gray-300 h-64'
          placeholder='영화 소개'
        />
        <div className='flex justify-between items-center mt-4'>
          <h1 className='text-xl font-bold'>포스터 이미지 업로드</h1>
          <label
            htmlFor='poster-upload'
            className='bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded border border-gray-400 cursor-pointer hover:bg-gray-300'
          >
            파일 찾아보기
          </label>
        </div>
        <Input
          type='file'
          id='poster-upload'
          className='hidden'
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