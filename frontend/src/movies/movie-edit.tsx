import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState } from 'react';
import { Modal } from '../commons/modal';

export const MovieEdit = () => {
  const GoBack = () => {
    window.history.back();
  };
  const handleClick = () => {
    alert('삭제되었습니다.');
    window.location.href = '/movies';
  };
  const handleEdit = () => {
    alert('수정되었습니다.');
    window.location.href = '/movies';
  };
  const [movie] = history.state ? [history.state] : [{ movie: '' }];

  const [showModal, setShowModal] = useState(false);
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';
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
        
        <div>
          <label htmlFor='title' className={labelStyle}>영화 제목</label>
          <Input
            id='title'
            type='text'
            className='border border-gray-300 w-full'
            defaultValue={movie.title}
          />
        </div>
        
        <div>
          <label htmlFor='director' className={labelStyle}>감독</label>
          <Input
            id='director'
            type='text'
            className='border border-gray-300 w-full'
            defaultValue={movie.director}
          />
        </div>

        <div>
          <label htmlFor='mainActor' className={labelStyle}>주연 배우</label>
          <Input
            id='mainActor'
            type='text'
            className='border border-gray-300 w-full'
            defaultValue={movie.mainActor}
          />
        </div>

        <div>
          <label htmlFor='releaseDate' className={labelStyle}>개봉일</label>
          <Input
            id='releaseDate'
            type='date'
            className='border border-gray-300 w-full'
            defaultValue={movie.releaseDate}
          />
        </div>

        <div>
          <label htmlFor='closeDate' className={labelStyle}>종영일</label>
          <Input
            id='closeDate'
            type='date'
            className='border border-gray-300 w-full'
            defaultValue={movie.closeDate}
          />
        </div>

        <div>
          <label htmlFor='runningTime' className={labelStyle}>상영 시간 (분)</label>
          <Input
            id='runningTime'
            type='number'
            className='border border-gray-300 w-full'
            defaultValue={movie.runningTime}
          />
        </div>

        <div>
          <label htmlFor='viewingAge' className={labelStyle}>관람 등급</label>
          <Input
            id='viewingAge'
            type='number'
            className='border border-gray-300 w-full'
            defaultValue={movie.viewingAge}
          />
        </div>

        <div>
          <label htmlFor='genre' className={labelStyle}>장르</label>
          <Input
            id='genre'
            type='text'
            className='border border-gray-300 w-full'
            defaultValue={movie.genre}
          />
        </div>

        <div>
          <label htmlFor='description' className={labelStyle}>줄거리</label>
          <textarea
            id='description'
            className='border border-gray-300 h-100 w-full'
            defaultValue={movie.description}
          />
        </div>

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
          onClick={handleEdit}
        >
          수정
        </Button>
        <Button
          type='button'
          className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          onClick={() => setShowModal(true)}
        >
          영화 삭제
        </Button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div>삭제하시겠습니까?</div>
            <Button type='button' className='w-1/2' onClick={handleClick}>
              삭제
            </Button>
          </Modal>
        )}
      </form>
    </div>
  );
};