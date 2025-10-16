import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState } from 'react';
import { Modal } from '../commons/modal';

export const MovieEdit = () => {
      const GoBack = () => {
    window.history.back();
  };
   const handleClick = () => {alert('삭제되었습니다.');
    window.location.href = '/movies';
  }
  const [movie] = history.state ? [history.state] : [{movie:''}];

   const [showModal, setShowModal] = useState(false);
  
    return (
        
        <div>
            <Button type="button" className="absolute top-2 right-2 bg-gray-500 p-2 rounded" onClick={GoBack}>
                    이전화면
                </Button>
        <form className="flex flex-col mt-20 gap-4 p-4 max-w-md mx-auto">
            <Input type="text" className='border border-gray-300' defaultValue={movie.title} />
            <Input type="text" className='border border-gray-300' defaultValue={movie.director} />
            <Input type="text" className='border border-gray-300' defaultValue={movie.mainActor} />
            <Input type="date" className='border border-gray-300' defaultValue={movie.releaseDate} />
            <Input type="date" className='border border-gray-300' defaultValue={movie.closeDate} />
            <Input type="number" className='border border-gray-300' defaultValue={movie.runningTime} />
            <Input type="number" className='border border-gray-300' defaultValue={movie.viewingAge} />
            <Input type="text" className='border border-gray-300' defaultValue={movie.genre} />
            <Input type="text" className='border border-gray-300 h-100' defaultValue={movie.description} />

            <h1 className="text-xl font-bold mt-4">포스터 이미지 업로드</h1> <Input type="file" />

                <Button type="submit" className = "bg-gray-500 p-2 rounded">
                    수정
                </Button>
                <Button type='button' className = "bg-gray-500 p-2 rounded" onClick={() => setShowModal(true)}>
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
}
