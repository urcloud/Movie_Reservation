import { useState } from "react";
import { Link } from "wouter";
import { PageLayout } from "../layouts/page-layout";
import { ContentLayout } from "../layouts/content-layout";

interface Movie {
  id: number;
  title: string;
  genre: string;
  releaseDate: string;
}

export const MovieListPage = () => {
  const [tab, setTab] = useState("상영중");
  const movies =
    tab === "상영중"
      ? [
          { id: 1, title: "범죄도시 5", genre: "액션", releaseDate: "2025-09-20" },
          { id: 2, title: "인사이드 아웃 3", genre: "애니메이션", releaseDate: "2025-10-01" },
        ]
      : [
          { id: 3, title: "아바타 3", genre: "SF", releaseDate: "2025-12-14" },
          { id: 4, title: "듄 3", genre: "SF", releaseDate: "2026-01-02" },
        ];

  return (
    <PageLayout>
      <ContentLayout>
        <h1 className="text-xl font-bold my-4">영화 목록</h1>

        {/* 탭 선택 */}
        <div className="flex justify-center gap-6 mb-4">
          {["상영중", "상영예정"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 border-b-2 ${
                tab === t ? "border-blue-500 font-bold" : "border-transparent"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 목록 */}
        <div className="grid grid-cols-2 gap-4">
          {movies.map((m) => (
            <Link key={m.id} to={`/movielist/${m.id}`}>
              <div className="border p-4 rounded shadow hover:shadow-md transition">
                <h3 className="font-bold text-lg">{m.title}</h3>
                <p>장르: {m.genre}</p>
                <p>개봉일: {m.releaseDate}</p>
              </div>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
