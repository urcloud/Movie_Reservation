import { Button } from '../commons/button';
import { Input } from '../commons/input';

export const MovieEdit = () => {
      const GoBack = () => {
    window.history.back();
  };
   const handleClick = () => {alert('삭제되었습니다.');
    window.location.href = '/movies';
  }
    return (
        
        <div>
            <Button type="button" className="absolute top-2 right-2 bg-gray-500 p-2 rounded" onClick={GoBack}>
                    이전화면
                </Button>
        <form className="flex flex-col mt-20 gap-4 p-4 max-w-md mx-auto">
            <Input type="text" className='border border-gray-300' placeholder="영화명" />
            <Input type="text" className='border border-gray-300' placeholder="감독명" />
            <Input type="text" className='border border-gray-300' placeholder="주연배우" />
            <Input type="date" className='border border-gray-300' placeholder="개봉일" />
            <Input type="date" className='border border-gray-300' placeholder="상영 종료일" />
            <Input type="number" className='border border-gray-300' placeholder="러닝타임" />
            <Input type="number" className='border border-gray-300' placeholder="관람등급" />
            <Input type="text" className='border border-gray-300' placeholder="장르" />
            <Input type="text" className='border border-gray-300' placeholder="영화 소개" />

            <h1 className="text-xl font-bold mt-4">포스터 이미지 업로드</h1> <Input type="file" />

                <Button type="submit" className = "bg-gray-500 p-2 rounded">
                    수정
                </Button>
                <Button type='button' className = "bg-gray-500 p-2 rounded" onClick={handleClick}>
                    영화 삭제
                </Button>
        </form>
        </div>

    );
}
