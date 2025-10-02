import { Button } from '../commons/button';
import { Input } from '../commons/input';

export const MovieIndex = () => {
    return (
        <div>
            <Button type="button" className="absolute top-2 right-2 bg-gray-500 p-2 rounded">
                이전화면
            </Button>
            <form className="flex flex-col gap-4 p-4 m-30 max-w-md mx-auto">
                <Button type="button" className="absolute top-2 left-2 bg-gray-500 p-2 rounded">
                    영화등록
                </Button>
                <Input type="text" className='border border-gray-300' placeholder="영화명" />
                <Input type="text" className='border border-gray-300' placeholder="감독명" />
                <Button type="button" className=" top-2 right-2 bg-gray-500 p-2 rounded">
                    검색
                </Button>
            </form>
            <div className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'>
                <span className='flex items-center justify-center'>영화명</span>
                <span className='flex items-center justify-center'>감독명</span>
                <span className='flex items-center justify-center'>개봉일</span>
                <span className='flex gap-1'>
                    <Button type="submit" className="bg-blue-500 w-20 h-20 p-2 rounded">
                        수정
                    </Button>
                    <Button type="submit" className="bg-gray-500 w-20 h-20 p-2 rounded">
                        영화<br />삭제
                    </Button>
                </span>
            </div>

            <div className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'>
                <span className='flex items-center justify-center'>영화명</span>
                <span className='flex items-center justify-center'>감독명</span>
                <span className='flex items-center justify-center'>개봉일</span>
                <span className='flex gap-1'>
                    <Button type="submit" className="bg-blue-500 w-20 h-20 p-2 rounded">
                        수정
                    </Button>
                    <Button type="submit" className="bg-gray-500 w-20 h-20 p-2 rounded">
                        영화<br />삭제
                    </Button>
                </span>
            </div>

            <div className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'>
                <span className='flex items-center justify-center'>영화명</span>
                <span className='flex items-center justify-center'>감독명</span>
                <span className='flex items-center justify-center'>개봉일</span>
                <span className='flex gap-1'>
                    <Button type="submit" className="bg-blue-500 w-20 h-20 p-2 rounded">
                        수정
                    </Button>
                    <Button type="submit" className="bg-gray-500 w-20 h-20 p-2 rounded">
                        영화<br />삭제
                    </Button>
                </span>
            </div>

            <div className='flex justify-evenly w-full h-20 mt-0.5 bg-gray-300 border border-black'>
                <span className='flex items-center justify-center'>영화명</span>
                <span className='flex items-center justify-center'>감독명</span>
                <span className='flex items-center justify-center'>개봉일</span>
                <span className='flex gap-1'>
                    <Button type="submit" className="bg-blue-500 w-20 h-20 p-2 rounded">
                        수정
                    </Button>
                    <Button type="submit" className="bg-gray-500 w-20 h-20 p-2 rounded">
                        영화<br />삭제
                    </Button>
                </span>
            </div>

            {/* <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                
                    <h2 className="text-lg font-bold mb-4">삭제 확인</h2>

                   
                    <p className="mb-4">정말 이 영화를 삭제하시겠습니까?</p>

                   
                    <div className="flex justify-end gap-2">
                        <button className="bg-gray-300 p-2 rounded">취소</button>
                        <button className="bg-gray-500 text-white p-2 rounded">삭제</button>
                    </div>
                </div>
            </div> */}
        </div>

    );
}
