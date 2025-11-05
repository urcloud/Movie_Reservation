import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useState } from 'react';
import { Link } from 'wouter';
import { mockScreenings } from '../data/screenings';


export const ScreeningEdit = () => {
    const [movie] = history.state ? [history.state] : [{ movie: '' }];
      const [screenings, setScreenings] = useState(mockScreenings); 
    
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

        <div className='relative pt-20'>
            {screenings.map((screening) => (
                <div key={screening.screeningId}>
                    <p>상영관: {screening.theaterId}관</p>
                    <p>상영일자: {formatLocalDate(screening.screeningDate)}</p>
                    <p>상영 시작 시간: {formatLocalTime(screening.startTime)}</p>
                    <p>상영 종료 시간: {formatLocalTime(screening.endTime)}</p>
                    <p>가격: {screening.ticketPrice}</p>
                </div>


            ))}
       <Button
        type='button'
        className='absolute top-2 right-2 bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
        onClick={GoBack}
      >
        이전화면
      </Button>
            <Link to={`/register/${movie.id}`}>
                <Button
                  type='button'
                  className='bg-white text-gray-700 border border-gray-300 p-2 rounded hover:bg-gray-50'
                >
                  상영정보 등록
                </Button>
              </Link>
        </div>
        
    )
    
}