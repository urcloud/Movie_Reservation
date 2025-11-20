import { useState, useEffect } from 'react';
import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useLocation, useRoute } from 'wouter';

export const TheaterEdit = () => {
  const [_, setLocation] = useLocation();
  const [match, params] = useRoute('/edit/:id');
  const theaterId = params ? Number(params.id) : null;
  
  // history.state로 넘어온 값이 없으면 fetch를 위해 null 처리
  const [theater, setTheater] = useState<any>(history.state || null);

  // 만약 목록에서 직접 안 들어오고 URL로 바로 들어왔을 때를 대비한 데이터 로드
  useEffect(() => {
    if (!theater && theaterId) {
      fetch(`/api/theaters/${theaterId}`)
        .then((res) => res.json())
        .then((data) => setTheater(data));
    }
  }, [theater, theaterId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theaterId) return;

    const formData = new FormData(e.target as HTMLFormElement);
    
    const body = {
      theaterName: formData.get('name'),
      rows: Number(formData.get('rows')),
      cols: Number(formData.get('cols')),
    };

    try {
      const res = await fetch(`/api/theaters/${theaterId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert('수정되었습니다.');
        setLocation('/theaters');
      } else {
        const err = await res.json();
        alert(`수정 실패: ${err.message}`);
      }
    } catch (error) {
      console.error('Edit error:', error);
    }
  };

  if (!theater) return <div>로딩 중...</div>;

  return (
    <div>
      <Button
        type='button'
        className='absolute top-2 right-2 bg-gray-500 p-2 rounded'
        onClick={() => window.history.back()}
      >
        이전화면
      </Button>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col mt-20 gap-4 p-4 max-w-md mx-auto'
      >
        <label className='text-sm font-bold'>상영관 이름</label>
        <Input
          type='text'
          name='name'
          className='border border-gray-300'
          defaultValue={theater.theaterName || theater.name} // 호환대비
        />
        
        <label className='text-sm font-bold'>좌석 행 (수정 시 좌석 초기화)</label>
        <Input
          type='number'
          name='rows'
          className='border border-gray-300'
          defaultValue={theater.rows}
        />
        
        <label className='text-sm font-bold'>좌석 열 (수정 시 좌석 초기화)</label>
        <Input
          type='number'
          name='cols'
          className='border border-gray-300'
          defaultValue={theater.cols}
        />

        <Button type='submit' className='bg-blue-500 p-2 rounded text-white'>
          수정 완료
        </Button>
      </form>
    </div>
  );
};