// /pages/guest-res-detail.tsx
import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { ReservDetailView, type ReservLite } from './res-detail-view';
import { Reservs } from '../data/reservations';

interface Props { id: string; }

export const GuestReservDetail = ({ id }: Props) => {
  const [, setLocation] = useLocation();

  const data = useMemo<ReservLite | undefined>(() => {
    const found = Reservs.getGuestById(String(id));
    return found ? { ...found } : undefined;
  }, [id]);

  if (!data) {
    return <div className="p-6 text-red-600">예매 내역을 찾을 수 없습니다.</div>;
  }

  // ✅ 실제 취소(삭제) 수행 콜백: 데이터 삭제 후 목록으로 이동
  const handleDelete = (rid: string) => {
    // 존재한다면 취소 API/메서드 호출 (in-memory라면 아래처럼)
    Reservs.cancelGuest?.(rid);      // ← reservations.ts에 아래 3) 추가
    setLocation('/guest-reservations');
  };

  return (
    <ReservDetailView
      Reserv={data}
      backTo="/guest-reservations"   // ← 대소문자 수정
      title="예매 상세"
      onDelete={handleDelete}        // ← 필수 콜백 전달
    />
  );
};
