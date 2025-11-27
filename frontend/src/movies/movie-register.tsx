import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState } from 'react';

export const MovieRegister = () => {
  const GoBack = () => {
    window.history.back();
  };

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [mainActor, setMainActor] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [closeDate, setCloseDate] = useState('');
  const [runningTime, setRunningTime] = useState('');
  const [viewingAge, setViewingAge] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');

  const handleRegister = async () => {
    if (!title || !director || !mainActor || !releaseDate || !runningTime || !genre) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    const payload = {
      title,
      director,
      main_actor: mainActor,             
      release_date: releaseDate,         
      close_date: closeDate,              
      running_time: Number(runningTime), 
      viewing_age: Number(viewingAge),   
      genre,
      description,
    };

    try {
      const response = await fetch('/api/movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('성공적으로 등록되었습니다.');
        window.location.href = '/movies';
      } else {
        alert(`등록 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error registering movie:', error);
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
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='영화명'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='감독명'
          required
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='주연배우'
          required
          value={mainActor}
          onChange={(e) => setMainActor(e.target.value)}
        />
        
        <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1 ml-1'>개봉일</label>
            <Input
            type='date'
            className='border border-gray-300'
            required
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            />
        </div>

        <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1 ml-1'>상영 종료일</label>
            <Input
            type='date'
            className='border border-gray-300'
            required
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
            />
        </div>

        <Input
          type='number'
          className='border border-gray-300'
          placeholder='러닝타임 (분)'
          required
          value={runningTime}
          onChange={(e) => setRunningTime(e.target.value)}
        />
        <Input
          type='number'
          className='border border-gray-300'
          placeholder='관람등급 (전체이용가일 경우 0 입력)'
          value={viewingAge}
          onChange={(e) => setViewingAge(e.target.value)}
        />
        <Input
          type='text'
          className='border border-gray-300'
          placeholder='장르'
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <textarea
          className='border border-gray-300 h-64 p-2 w-full rounded'
          placeholder='영화 소개'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          onClick={handleRegister}
        >
          등록
        </Button>
      </form>
    </div>
  );
};