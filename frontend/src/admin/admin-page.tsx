import { Link } from 'wouter';
import { PageLayout } from '../layouts/page-layout';

export const Admin = () => {
  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
        <h1 className="text-2xl font-bold mb-6">관리자 관리페이지</h1>

        {/* 상영관 정보 조회 */}
        <Link
          href="/theaters"
          className="w-64 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-center block"
        >
          상영관 정보 조회
        </Link>

        {/* 영화 정보 조회 */}
        <Link
          href="/movies"
          className="w-64 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-center block"
        >
          영화 정보 조회
        </Link>

        {/* 상영 조회 */}
        <Link
          href="/screening"
          className="w-64 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-center block"
        >
          상영 조회
        </Link>
      </div>
    </PageLayout>
  );
};
