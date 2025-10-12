// src/pages/guest-booking.tsx
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Button } from '../commons/button';
import { Link } from 'wouter';
import { Bookings } from '../booking/bookings';

export const MemberBooking = () => {
  const rows = Bookings.listMember();

  return (
    <PageLayout>
      <ContentLayout>
          <div className="mb-4 flex items-center justify-between">
          <Link to="/">
            <Button className="px-3 py-2 rounded bg-gray-200">홈</Button>
          </Link>
          <Link to="/guest-reservations">
            <Button className="px-3 py-2 rounded bg-black text-white">비회원 예매</Button>
          </Link>
        </div>
        <h1 className="text-xl font-bold mb-4">회원 예매내역</h1>
        <div className="grid gap-2">
          {rows.map(b => (
            <Link key={b.id} to={`/mem-reservations/${b.id}`}>
              <div className="border p-3 rounded bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                <p className="font-semibold">#{b.id} · {b.movie}</p>
                <p className="text-sm text-gray-600">{b.date} {b.time} · {b.theater} · 좌석 {b.seat}</p>
                <div className="mt-2">
                  <Button className="bg-blue-500 text-white rounded px-3 py-2">상세</Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ContentLayout>
    </PageLayout>
  );
};
