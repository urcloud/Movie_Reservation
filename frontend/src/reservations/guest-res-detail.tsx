// /pages/guest-res-detail.tsx
import { useMemo } from 'react';
import { ReservDetailView, type ReservLite } from './res-detail-view';
import { Reservs } from '../data/reservations'; // ← /data 폴더 경로 맞추기

interface Props { id: string; }

export const GuestReservDetail = ({ id }: Props) => {
  // /data에서 id로 찾아오기
  const data = useMemo<ReservLite | undefined>(() => {
    const found = Reservs.getGuestById(String(id));
    return found
      ? { ...found } 
      : undefined;
  }, [id]);

  // 없을 때 간단 처리
  if (!data) {
    return <div className="p-6 text-red-600">예매 내역을 찾을 수 없습니다.</div>;
  }

  return (
    <ReservDetailView
      Reserv={data}
      backTo="/guest-Reservations"
      title="예매 상세"
    />
  );
};
