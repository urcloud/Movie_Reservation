import { ContentLayout } from '../layouts/content-layout';
import { PageLayout } from '../layouts/page-layout';
import { HomeHeader } from './home-header';
import { Section } from '../commons/section';
import { useState } from "react";

//영화 정보를 담는 TypeScript 인터페이스 정의
interface Movie {
  id: number;
  title: string;
  genre: string;
  description: string;
  director: string;
  cast: string;
}

//현재 선택된 탭을 저장하는 activeTab, 초기값 Top3으로 둠
export const Home = () => {
  const [activeTab, setActiveTab] = useState("Top3");

  // 탭별 영화 데이터, Mock 데이터로 나중에 DB 연동 후 교체 예정
  const tabData: Record<string, Movie[]> = {
    Top3: [
      { id: 1, title: "Top1", genre: "액션", description: "영화소개1", director: "홍길동", cast: "김철수" },
      { id: 2, title: "Top2", genre: "드라마", description: "영화소개2", director: "이영희", cast: "박영수" },
      { id: 3, title: "Top3", genre: "코미디", description: "영화소개3", director: "최민수", cast: "정하늘" },
    ],
    현재상영작: [
      { id: 4, title: "영화 A", genre: "액션", description: "소개 A", director: "감독 A", cast: "배우 A" },
      { id: 5, title: "영화 B", genre: "드라마", description: "소개 B", director: "감독 B", cast: "배우 B" },
      { id: 6, title: "영화 C", genre: "코미디", description: "소개 C", director: "감독 C", cast: "배우 C" },
    ],
    상영예정작: [
      { id: 7, title: "예정 1", genre: "액션", description: "소개 예정1", director: "감독 X", cast: "배우 X" },
      { id: 8, title: "예정 2", genre: "드라마", description: "소개 예정2", director: "감독 Y", cast: "배우 Y" },
      { id: 9, title: "예정 3", genre: "코미디", description: "소개 예정3", director: "감독 Z", cast: "배우 Z" },
    ],
  };

  //현재 선택된 탭의 영화 배열을 가져오고, 해당 탭 데이터가 없으면 빈 배열로 초기화
  const movies = tabData[activeTab] || [];

  return (
    <PageLayout>
      <HomeHeader />
      <ContentLayout>
        {/* 배너 영역, 가로전체 최소높이400, 중앙정렬, 글자 색 굵기, 반복 그라디언트 배경 */}
        <div className="w-full min-h-[400px] flex items-center justify-center
          bg-[repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6_10px,#e5e7eb_10px,#e5e7eb_20px)]
          text-gray-500 text-lg font-semibold">
          배너 이미지
        </div>

        {/* 탭 영역, 3열 격자, 각 탭 고르게 배치, 글자 중앙정렬 */}
        <div className="grid grid-cols-3 text-center my-4">
          {Object.keys(tabData).map((tab) => (
            <span
              key={tab}
              // 마우스 포인터 변경, 상하패딩, 선택된 탭이면 강조 표시
              className={`cursor-pointer py-2 ${
                activeTab === tab ? "font-bold border-b-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Section 렌더링, 제목 activeTab 표시, 영화 카드들을 grid로 1열 배치 */}
        <Section title={activeTab}>
          <div className="grid grid-cols-1 gap-4">
            {movies.map((movie) => (
              // 내부 정보레이어 위치 기준, 크기 지정, 내용 넘치면 숨김, 모서리 둥글게, hover 효과 적용
              <div key={movie.id} className="relative w-full h-[400px] overflow-hidden rounded-lg cursor-pointer group">
                {/* 포스터 대신 대체박스 */}
                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg transition-transform duration-300 group-hover:scale-105">
                  No Image
                </div>

                {/* 반투명 블러, hover 시 점점 나타남, 세로 정렬, 내용 중앙 정렬, 내용 많으면 스크롤 가능 */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-start items-center text-white p-4 text-center overflow-y-auto">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="mb-1">장르: {movie.genre}</p>
                  <p className="mb-1">{movie.description}</p>
                  <p className="mb-1">감독: {movie.director}</p>
                  <p className="mb-1">주연: {movie.cast}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </ContentLayout>
    </PageLayout>
  );
};
