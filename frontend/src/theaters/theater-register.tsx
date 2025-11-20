import { Button } from '../commons/button';
import { Input } from '../commons/input';
import { useLocation } from 'wouter';

export const TheaterRegister = () => {
  const [_, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const body = {
      theaterName: formData.get('name'),
      rows: Number(formData.get('rows')),
      cols: Number(formData.get('cols')),
    };

    try {
      const res = await fetch('http://localhost:5173/api/theaters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert('등록되었습니다!');
        setLocation('/theaters'); // 목록으로
      } else {
        const errorData = await res.json();
        alert(`등록 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Register error:', error);
    }
  };

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
        <Input
          type='text'
          name='name'
          className='border border-gray-300'
          placeholder='상영관 이름'
          required
        />
        <Input
          type='number'
          name='rows'
          className='border border-gray-300'
          placeholder='좌석 행 (예: 10)'
          required
        />
        <Input
          type='number'
          name='cols'
          className='border border-gray-300'
          placeholder='좌석 열 (예: 8)'
          required
        />

        <Button type='submit' className='bg-gray-500 p-2 rounded'>
          등록
        </Button>
      </form>
    </div>
  );
};