import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Link } from 'wouter';

interface Props {
  id: string;
}

export const BookingDetail = ({ id }: Props) => {
  // 실제라면 서버에서 id로 조회
  const booking = {
    id,
    movie: '인터스텔라',
    date: '2025-10-05',
    seat: 'A12',
    theater: '강남점 3관',
    time: '12:00 P.M',
  };

  return (
    <PageLayout>
      <ContentLayout>
        <h1 className="text-xl font-bold mb-4">예매 상세</h1>
        <div className="border p-4 rounded shadow bg-gray-50">
          <p>영화: {booking.movie}</p>
          <p>날짜: {booking.date}</p>
          <p>좌석: {booking.seat}</p>
          <p>상영관: {booking.theater}</p>
          <p>시작시간: {booking.time}</p>
        </div>

        <Link href="/guest-booking">
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            목록으로 돌아가기
          </button>
        </Link>
      </ContentLayout>
    </PageLayout>
  );
};
