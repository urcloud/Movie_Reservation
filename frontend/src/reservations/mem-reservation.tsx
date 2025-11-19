import { useEffect, useState } from 'react';
import { PageLayout } from '../layouts/page-layout';
import { ContentLayout } from '../layouts/content-layout';
import { Button } from '../commons/button';
import { Link } from 'wouter';
import { Reservs, type ReservItem } from '../data/reservations';
import { getUserEmail, isLoggedIn } from '../data/session';

export const MemberResrv = () => {
  const [items, setItems] = useState<ReservItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      setLoading(true);

      const email = getUserEmail();

      if (!email) {
        // 로그인 안 된 상태
        setError('회원 예매내역을 보려면 로그인이 필요합니다.');
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        const data = await Reservs.listMember(email);
        setItems(data);
      } catch (err: any) {
        setError(err?.message || '예매내역 조회 중 오류가 발생했습니다.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <PageLayout>
      <ContentLayout>
        <div className="mb-4 flex items-center justify-between" />
        <h1 className="text-xl font-bold mb-4">회원 예매내역</h1>

        {loading && <p className="text-gray-500">불러오는 중입니다...</p>}
        {!loading && error && <p className="text-red-500 mb-4">{error}</p>}

        {!loading && !error && items.length === 0 && (
          <p className="text-gray-500">예매 내역이 없습니다.</p>
        )}

        {!loading && !error && items.length > 0 && (
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

        {/* 로그인 안 됐을 때 로그인 페이지로 보내는 버튼 정도만 추가 */}
        {!loading && !isLoggedIn() && (
          <div className="mt-4">
            <Link to="/login">
              <Button className="bg-black text-white rounded px-4 py-2">
                로그인 하러가기
              </Button>
            </Link>
          </div>
        )}
      </ContentLayout>
    </PageLayout>
  );
};
