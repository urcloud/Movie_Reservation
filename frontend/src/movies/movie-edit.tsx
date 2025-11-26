import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState } from 'react';
import { Modal } from '../commons/modal';

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return dateString.split('T')[0];
};

export const MovieEdit = () => {
  const GoBack = () => {
    window.history.back();
  };

  const [movie] = history.state ? [history.state] : [{ movie: null }];

  const [showModal, setShowModal] = useState(false);
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';

  const [title, setTitle] = useState(movie?.title || '');
  const [director, setDirector] = useState(movie?.director || '');
  const [mainActor, setMainActor] = useState(movie?.main_actor || movie?.mainActor || '');
  const [releaseDate, setReleaseDate] = useState(formatDate(movie?.release_date || movie?.releaseDate));
  const [closeDate, setCloseDate] = useState(formatDate(movie?.close_date || movie?.closeDate));
  const [runningTime, setRunningTime] = useState(movie?.running_time || movie?.runningTime || '');
  const [viewingAge, setViewingAge] = useState(movie?.viewing_age || movie?.viewingAge || '');
  const [genre, setGenre] = useState(movie?.genre || '');
  const [description, setDescription] = useState(movie?.description || '');

  const handleDelete = async () => {
    if (!movie || !movie.id) return;

    try {
      const response = await fetch(`/api/movie/${movie.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('삭제되었습니다.');
        window.location.href = '/movies';
      } else {
        const result = await response.json();
        alert(`삭제 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };

  const handleUpdate = async () => {
    if (!movie || !movie.id) return;

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
      const response = await fetch(`/api/movie/${movie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('수정되었습니다.');
        window.location.href = '/movies';
      } else {
        alert(`수정 실패: ${result.message}`);
      }
    } catch (error) {
      console.error('Error updating:', error);
      alert('서버 통신 중 오류가 발생했습니다.');
    }
  };

  if (!movie) return <div className='pt-20 text-center'>영화 정보를 불러올 수 없습니다.</div>;

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor='director' className={labelStyle}>감독</label>
          <Input
            id='director'
            type='text'
            className='border border-gray-300 w-full'
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='mainActor' className={labelStyle}>주연 배우</label>
          <Input
            id='mainActor'
            type='text'
            className='border border-gray-300 w-full'
            value={mainActor}
            onChange={(e) => setMainActor(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='releaseDate' className={labelStyle}>개봉일</label>
          <Input
            id='releaseDate'
            type='date'
            className='border border-gray-300 w-full'
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='closeDate' className={labelStyle}>종영일</label>
          <Input
            id='closeDate'
            type='date'
            className='border border-gray-300 w-full'
            value={closeDate}
            onChange={(e) => setCloseDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='runningTime' className={labelStyle}>상영 시간 (분)</label>
          <Input
            id='runningTime'
            type='number'
            className='border border-gray-300 w-full'
            value={runningTime}
            onChange={(e) => setRunningTime(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='viewingAge' className={labelStyle}>관람 등급 (전체이용가일 경우 0 입력)</label>
          <Input
            id='viewingAge'
            type='number'
            className='border border-gray-300 w-full'
            value={viewingAge}
            onChange={(e) => setViewingAge(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='genre' className={labelStyle}>장르</label>
          <Input
            id='genre'
            type='text'
            className='border border-gray-300 w-full'
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='description' className={labelStyle}>줄거리</label>
          <textarea
            id='description'
            className='border border-gray-300 h-100 w-full'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          onClick={handleUpdate}
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
            <Button type='button' className='w-1/2' onClick={handleDelete}>
              삭제
            </Button>
          </Modal>
        )}
      </form>
    </div>
  );
};