import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState } from 'react';
import { Modal } from '../commons/modal';

export const ScreeningEdit = () => {
 const GoBack = () => {
    window.history.back();
  };
  const handleClick = () => {
    alert('삭제되었습니다.');
    window.location.href = '/screening';
  };
  const handleEdit = () => {
    alert('수정되었습니다.');
    window.location.href = '/screening';
  };
  const [screening] = history.state ? [history.state] : [{ screening: '' }];
  const [showModal, setShowModal] = useState(false);
  const labelStyle = 'block text-sm font-medium text-gray-600 mb-1';
  const formatToLocalISO = (isoString: string) => { //날짜 및 상영관 유효성 검사 추가 필요
    if (!isoString) return '';
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
    
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
        
        <div>
          <label htmlFor='theater' className={labelStyle}>상영관</label>
          <Input
            id='theater'
            type='number'
            className='border border-gray-300 w-full'
            defaultValue={screening.theaterId}
          />
        </div>

        <div>
          <label htmlFor='screeningDate' className={labelStyle}>상영일자</label>
          <Input
            id='screeningDate'
            type='date'
            className='border border-gray-300 w-full'
            defaultValue={screening.screeningDate}
          />
        </div>

        <div>
          <label htmlFor='screening.startTime' className={labelStyle}>상영 시작 시간</label>
          <Input
            id='screening.startTime'
            type='datetime-local'
            className='border border-gray-300 w-full'
            defaultValue={formatToLocalISO(screening.startTime)}
          />
        </div>

        <div>
          <label htmlFor='screening.endTime' className={labelStyle}>상영 종료 시간</label>
          <Input
            id='screening.endTime'
            type='datetime-local'
            className='border border-gray-300 w-full'
            defaultValue={formatToLocalISO(screening.endTime)}
          />
        </div>

        <div>
          <label htmlFor='ticketPrice' className={labelStyle}>티켓 가격(원)</label>
          <Input
            id='ticketPrice'
            type='number'
            className='border border-gray-300 w-full'
            defaultValue={screening.ticketPrice}
          />
        </div>
      
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