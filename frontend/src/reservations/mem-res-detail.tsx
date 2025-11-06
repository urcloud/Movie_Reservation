// /pages/mem-res-detail.tsx
import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { ReservDetailView, type ReservLite } from './res-detail-view';
import { Reservs } from '../data/reservations';

interface Props { id: string; }

export const MemberReservDetail = ({ id }: Props) => {
  const [, setLocation] = useLocation();

  const data = useMemo<ReservLite | undefined>(() => {
    const found = Reservs.getMemberById(String(id));
    return found ? { ...found } : undefined;
  }, [id]);

  if (!data) {
    return <div className="p-6 text-red-600">예매 내역을 찾을 수 없습니다.</div>;
  }

  const handleDelete = (rid: string) => {
    Reservs.cancelMember?.(rid);     // ← reservations.ts에 아래 3) 추가
    setLocation('/mem-reservations');
  };

  return (
    <ReservDetailView
      Reserv={data}
      backTo="/mem-reservations"      // ← 경로 일치
      title="예매 상세"
      onDelete={handleDelete}         // ← 필수 콜백 전달
    />
  );
};
