import { Link } from 'wouter';
import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { mockMovies } from '../data/movies';
import { useState } from 'react';
import { Modal } from '../commons/modal';

export const ScreeningInform = () => {
  const GoBack = () => {
    window.history.back();
  };
  const movieSearch = () => { 
    alert('검색되었습니다.');
  };

  const [titleSortOrder, setTitleSortOrder] = useState('asc');
  const [directorSortOrder, setDirectorSortOrder] = useState('asc');
  const [dateSortOrder, setDateSortOrder] = useState('asc');

  const [movies, setMovies] = useState(mockMovies); //임시 삭제 로직
  const handleDelete = (id: number) => {
    const modified = movies.filter((movie) => movie.id !== id);
    setMovies(modified);
    alert('삭제되었습니다.');
    console.log('delete', id);
  };

  const [modalForMovieId, setModalForMovieId] = useState<number | null>(null);

 const sortByTitle = () => {
   const newOrder = titleSortOrder === 'asc' ? 'desc' : 'asc';

    const sorted = [...movies].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setMovies(sorted);
    setTitleSortOrder(newOrder);
  };

  const sortByDirector = () => {
   const newOrder = directorSortOrder === 'asc' ? 'desc' : 'asc';

    const sorted = [...movies].sort((a, b) => {
      if (newOrder === 'asc') {
        return a.director.localeCompare(b.director);
      } else {
        return b.director.localeCompare(a.director);
      }
    });
    setMovies(sorted);
    setDirectorSortOrder(newOrder);
  };

 const sortByDate = () => {
   const newOrder = dateSortOrder === 'asc' ? 'desc' : 'asc';

    const sorted = [...movies].sort((a, b) => {
      const dateA = new Date(a.releaseDate);
      const dateB = new Date(b.releaseDate);
      if (newOrder === 'asc') {
        return dateA.getTime() - dateB.getTime();
      } else {
        return dateB.getTime() - dateA.getTime(); 
      }
    });
    setMovies(sorted);
    setDateSortOrder(newOrder);
  };
  
  return (
    <div className='relative pt-20 bg-gray-50 min-h-screen'>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
        onClick={GoBack}
      >
        이전화면
      </Button>
      <form className='flex flex-col gap-4 mt-20 p-4 max-w-md mx-auto'>
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
          className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          onClick={movieSearch}
        >
          검색
        </Button>
      </form>

      <div className='flex w-full h-12 mt-30 bg-gray-200 border border-gray-300 font-bold text-gray-600'>
 <span className='w-1/4 flex items-center justify-center'>
          <button type='button' onClick={sortByTitle} className='font-bold hover:text-blue-600 p-2'>
            제목 {titleSortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </span>
<span className='w-1/4 flex items-center justify-center'>
          <button type='button' onClick={sortByDirector} className='font-bold hover:text-blue-600 p-2'>
          감독 {directorSortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </span>
<span className='w-1/4 flex items-center justify-center gap-2'>
          <button type='button' onClick={sortByDate} className='font-bold hover:text-blue-600 p-2'>
            개봉일 {dateSortOrder === 'asc' ? '▲' : '▼'}
          </button>
        </span>
 <span className='w-1/4 flex items-center justify-center'>관리</span>
</div>

      {movies.map((movie) => (
        <div
          key={movie.id}
          className='flex w-full h-20 bg-white border border-gray-200'
        >
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
                className='bg-gray-200 text-gray-800 w-20 h-16 p-2 rounded hover:bg-gray-300'
              >
                상영정보 관리
              </Button>
            </Link>

          </span>
        </div>
      ))}
      {modalForMovieId !== null && (
        <Modal
          onClose={() => setModalForMovieId(null)}
        >
          <div>삭제하시겠습니까?</div>
          <Button type='button' className='w-1/2' onClick={()=>{handleDelete(modalForMovieId!);  setModalForMovieId(null);}}>
            삭제
          </Button>
        </Modal>
      )}
    </div>
  );
};