import { useState } from 'react';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Input } from '../commons/input';
import { Button } from '../commons/button';
import { Link } from 'wouter';
import { Bookings } from '../booking/bookings';

export const GuestBooking = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 어떤 문자열이든 OK — 제출하면 전체 리스트 노출
    setSubmitted(true);
  };

  const rows = submitted ? Bookings.listGuest() : [];

  return (
    <PageLayout>
      <ContentLayout>
          <div className="mb-4 flex items-center justify-between">
          <Link to="/">
            <Button className="px-3 py-2 rounded bg-gray-200">홈</Button>
          </Link>
          <Link to="/mem-reservations">
            <Button className="px-3 py-2 rounded bg-black text-white">회원 예매</Button>
          </Link>
        </div>
        <h1 className="text-xl font-bold mb-4">비회원 예매내역 조회</h1>

        {/* 이메일 입력  */}
        <form onSubmit={onSubmit} className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <Input
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
          <Button type="submit" className="bg-black text-white rounded px-4 py-2">조회</Button>
        </form>

        {/* 결과 리스트 */}
        {rows.length === 0 ? (
          <p className="text-gray-500">이메일을 입력하고 ‘조회’를 누르면 예매내역이 표시됩니다.</p>
        ) : (
          <div className="grid gap-2">
            {rows.map((b) => (
              <Link key={b.id} to={`/guest-reservations/${b.id}`}>
                <div className="border p-3 rounded bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold"> {b.movie}</p>
                  <p className="text-sm text-gray-600">
                    {b.date} {b.time} · {b.theater} · 좌석 {b.seat}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </ContentLayout>
    </PageLayout>
  );
};
