import { useState } from 'react';
import { ContentLayout } from '../layouts/content-layout';
import { PageLayout } from '../layouts/page-layout';
import { HomeHeader } from './home-header';
import { Modal } from '../commons/modal';
import { Button } from '../commons/button';
import { tabData } from '../data/movies';
import type { Movie } from '../models/movie';

const tabNameMap: Record<string, string> = {
  Top3: 'Top 3',
  nowPlaying: '현재상영작',
  comingSoon: '상영예정작',
};

export const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Top3');

  const movies: Movie[] = tabData[activeTab] || [];

  return (
    <PageLayout>
      <HomeHeader />
      <Button onClick={() => setShowModal(true)}>show modal</Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>Hi</div>
        </Modal>
      )}
      <ContentLayout>
        {/* 배너 영역 */}
        <div
          className='w-full min-h-[400px] flex items-center justify-center
          bg-[repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6_10px,#e5e7eb_10px,#e5e7eb_20px)]
          text-gray-500 text-lg font-semibold'
        >
          배너 이미지
        </div>

        {/* 탭 영역 */}
      <div className="grid grid-cols-3 text-center my-4">
        {Object.keys(tabData).map((key) => (
          <span
            key={key}
            className={`cursor-pointer py-2 ${activeTab === key ? 'font-bold border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab(key)}
          >
            {tabNameMap[key]}
          </span>
        ))}
      </div>

        {/* 영화 카드 리스트 */}
        <div className='grid grid-cols-1 gap-4'>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className='relative w-full h-[400px] overflow-hidden rounded-lg cursor-pointer group'
            >
              {/* 포스터 대신 대체박스 */}
              <div className='w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg transition-transform duration-300 group-hover:scale-105'>
                No Image
              </div>

              {/* 정보 레이어 */}
              <div className='absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-start items-center text-white p-4 text-center overflow-y-auto'>
                <h3 className='text-xl font-bold mb-2'>{movie.title}</h3>
                <p className='mb-1'>장르: {movie.genre}</p>
                <p className='mb-1'>{movie.description}</p>
                <p className='mb-1'>감독: {movie.director}</p>
                <p className='mb-1'>주연: {movie.cast}</p>
              </div>
            </div>
          ))}
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
