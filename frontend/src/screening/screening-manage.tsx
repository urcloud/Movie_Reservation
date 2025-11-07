import { Button } from '../commons/button';
import { useState } from 'react';
import { Link } from 'wouter';
import { mockScreenings } from '../data/screenings';
import { Modal } from '../commons/modal';


export const ScreeningManage = () => {
  const [movie] = history.state ? [history.state] : [{ movie: '' }];
  const [screenings, setScreenings] = useState(mockScreenings); 
  const [modalForScreeningId, setModalForScreeningId] = useState<number | null>(null);

  const handleDelete = (id: number) => { //임시 삭제 로직
    const modified = screenings.filter((screening) => screening.screeningId !== id);
    setScreenings(modified);
    alert('삭제되었습니다.');
    console.log('delete', id);
  };
  const GoBack = () => {
    window.history.back();
  };
  const formatLocalDate = (isoString:string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('ko-KR');
  }
  const formatLocalTime = (isoString:string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  return(
    <div className='relative pt-20 bg-gray-50 min-h-screen'>
      
      <Button
        type='button'
        className='absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
        onClick={GoBack}
      >
        이전화면
      </Button>

      <div className='max-w-md mx-auto mt-20 flex flex-col gap-4 p-4'>
        {screenings.map((screening) => (
          <div 
            key={screening.screeningId} 
            className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'
          >
            <p className='font-semibold text-lg text-gray-800'>상영관: {screening.theaterId}관</p>
            <p className='text-gray-600'>상영일자: {formatLocalDate(screening.screeningDate)}</p>
            <p className='text-gray-600'>상영 시작 시간: {formatLocalTime(screening.startTime)}</p>
            <p className='text-gray-600'>상영 종료 시간: {formatLocalTime(screening.endTime)}</p>
            <p className='text-gray-600'>가격: {screening.ticketPrice}</p>
            
            <span className='flex gap-1 items-center justify-end mt-4'>
              <Link to={`/edit/${movie.id}`} state={screening}>
                <Button
                  type='button'
                  className='bg-gray-200 text-gray-800 w-20 h-16 p-2 rounded hover:bg-gray-300'
                >
                  수정
                </Button>
              </Link>
              <Button
                type='button'
                className='bg-gray-300 text-gray-800 w-20 h-16 p-2 rounded hover:bg-gray-400'
                onClick={() => setModalForScreeningId(screening.screeningId)}
              >
                정보
                <br />
                삭제
              </Button>

            </span>
          </div>
        ))}
        
        <Link to={`/register/${movie.id}`}>
          <Button
            type='button'
            className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
          >
            상영정보 등록
          </Button>
        </Link>
      </div>
      {modalForScreeningId !== null && (
            <Modal
              onClose={() => setModalForScreeningId(null)}
            >
              <div>삭제하시겠습니까?</div>
              <Button type='button' className='w-1/2' onClick={()=>{handleDelete(modalForScreeningId!); setModalForScreeningId(null);}}>
                삭제
              </Button>
            </Modal>
          )}
    </div>
  )
}