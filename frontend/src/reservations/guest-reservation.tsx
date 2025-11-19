// src/reservations/guest-reservation.tsx
import { useState } from 'react';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Input } from '../commons/input';
import { Button } from '../commons/button';
import { Link } from 'wouter';
import { Reservs, type ReservItem } from '../data/reservations';

export const GuestReserv = () => {
  const [email, setEmail] = useState('');
  const [items, setItems] = useState<ReservItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitted(true);
    setLoading(true);
    try {
      const data = await Reservs.listGuest(email);
      setItems(data);
    } catch (err: any) {
      setError(err?.message || '예매내역 조회 중 오류가 발생했습니다.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <ContentLayout>
        <div className="mb-4 flex items-center justify-between" />
        <h1 className="text-xl font-bold mb-4">비회원 예매내역 조회</h1>

        {/* 이메일 입력  */}
        <form onSubmit={onSubmit} className="mb-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <Input
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
          />
          <Button type="submit" className="bg-black text-white rounded px-4 py-2">
            조회
          </Button>
        </form>

        {loading && <p className="text-gray-500">불러오는 중입니다...</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* 결과 리스트 */}
        {!submitted ? (
          <p className="text-gray-500">
            이메일을 입력하고 ‘조회’를 누르면 예매내역이 표시됩니다.
          </p>
        ) : items.length === 0 && !loading ? (
          <p className="text-gray-500">해당 이메일로 조회된 예매내역이 없습니다.</p>
        ) : (
          <div className="grid gap-2">
            {items.map((b) => (
              <Link key={b.id} to={`/reservations/${b.id}`}>
                <div className="border p-3 rounded bg-white shadow-sm hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold">{b.movie}</p>
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
