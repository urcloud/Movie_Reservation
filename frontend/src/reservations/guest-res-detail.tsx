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
      ? { ...found } // ReservLite 와 필드명이 동일하니 그대로 캐스팅/복사
      : undefined;
  }, [id]);

  // 없을 때 간단 처리(원하면 전용 NotFound UI로)
  if (!data) {
    return <div className="p-6 text-red-600">예매 내역을 찾을 수 없습니다.</div>;
  }

  return (
    <ReservDetailView
      Reserv={data}
      backTo="/guest-Reservs"
      title="예매 상세"
    />
  );
};
