import { useState, useEffect } from 'react';
import { ContentLayout } from '../layouts/content-layout';
import { PageLayout } from '../layouts/page-layout';
import { Modal } from '../commons/modal';
import { Button } from '../commons/button';
import type { Movie } from '../models/movie';
import { Link } from 'wouter';

const tabNameMap: Record<string, string> = {
  Top3: 'Top 3',
  nowPlaying: '현재상영작',
  comingSoon: '상영예정작',
};

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Top3');
  const [tabData, setTabData] = useState<Record<string, Movie[]>>({
    Top3: [],
    nowPlaying: [],
    comingSoon: [],
  });

  // 홈 페이지 초기 데이터 로드
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch('/api/home');
        const data = await res.json();
        if (data.ok) {
          setTabData({
            Top3: data.data.top3,
            nowPlaying: data.data.nowPlaying,
            comingSoon: data.data.comingSoon,
          });
        }
      } catch (err) {
        console.error('홈 데이터 불러오기 실패', err);
      }
    };

    fetchHomeData();
  }, []);

  const movies: Movie[] = tabData[activeTab] || [];

  return (
    <PageLayout>
      <Button onClick={() => setShowModal(true)}>show modal</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>Hi</div>
        </Modal>
      )}
      <ContentLayout>
        {/* 배너 */}
        <div
          className='w-full min-h-[400px] flex items-center justify-center
          bg-[repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6_10px,#e5e7eb_10px,#e5e7eb_20px)]
          text-gray-500 text-lg font-semibold'
        >
          배너 이미지
        </div>

        {/* 탭 */}
        <div className='grid grid-cols-3 text-center my-4'>
          {Object.keys(tabNameMap).map((key) => (
            <span
              key={key}
              className={`cursor-pointer py-2 ${
                activeTab === key ? 'font-bold border-b-2 border-blue-500' : ''
              }`}
              onClick={() => setActiveTab(key)}
            >
              {tabNameMap[key]}
            </span>
          ))}
        </div>

        {/* 영화 카드 */}
        <div className='grid grid-cols-1 gap-4'>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className='relative w-full h-[400px] overflow-hidden rounded-lg cursor-pointer group'
            >
              <div className='w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg transition-transform duration-300 group-hover:scale-105'>
                No Image
              </div>

              {/* hover 정보 */}
              <div className='absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-start items-center text-white p-4 text-center overflow-y-auto'>
                <h3 className='text-xl font-bold mb-2'>{movie.title}</h3>
                <p className='mb-1'>장르: {movie.genre}</p>
                <p className='mb-1'>{movie.description}</p>
                <p className='mb-1'>감독: {movie.director}</p>
                <p className='mb-1'>주연: {movie.main_actor}</p>
              </div>
            </div>
          ))}
        </div>

        {activeTab !== 'Top3' && (
          <div className='flex justify-center mt-6'>
            <Link to='/movielist'>
              <Button className='bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition'>
                더 많은 영화 목록 보기
              </Button>
            </Link>
          </div>
        )}
      </ContentLayout>
    </PageLayout>
  );
};
