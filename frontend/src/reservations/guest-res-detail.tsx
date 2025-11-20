// src/reservations/guest-res-detail.tsx
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ReservDetailView, type ReservLite } from './res-detail-view';
import { Reservs, type ReservItem } from '../data/reservations';

interface Props {
  id: string;
}

export const GuestReservDetail = ({ id }: Props) => {
  const [, setLocation] = useLocation();
  const [data, setData] = useState<ReservLite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setError('');
      setLoading(true);
      try {
        const item: ReservItem = await Reservs.getById(String(id));
        const lite: ReservLite = {
          id: item.id,
          movie: item.movie,
          date: item.date,
          time: item.time,
          theater: item.theater,
          seat: item.seat,
        };
        setData(lite);
      } catch (err: any) {
        setError(err?.message || '예매 내역을 불러오는 동안 오류가 발생했습니다.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return <div className="p-6">불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-red-600">예매 내역을 찾을 수 없습니다.</div>;
  }

  // 취소 콜백: 백엔드에 취소 요청 후 목록으로 이동
  const handleDelete = async (rid: string) => {
    try {
      await Reservs.cancelGuest(rid);
    } catch (err) {
      // 실패해도 일단 목록으로 보내거나, 별도 에러 처리 가능
      console.error(err);
    } finally {
      setLocation('/reservations');
    }
  };

  return (
    <ReservDetailView
      Reserv={data}
      backTo="/reservations"
      title="예매 상세"
      onDelete={handleDelete}
    />
  );
};
