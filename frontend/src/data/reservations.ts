// /data/reservations.ts
export type ReservItem = {
  id: string;
  movie: string;
  date: string;
  time: string;
  theater: string;
  seat: string;
};

// 게스트 목데이터 
const GUEST_RESERVS: ReservItem[] = [
  { id: '101', movie: '인터스텔라',  date: '2025-10-20', time: '19:30', theater: '강남 3관', seat: 'A12' },
  { id: '102', movie: '오펜하이머',  date: '2025-10-22', time: '21:10', theater: '용산 2관', seat: 'C07' },
  { id: '103', movie: '듄: 파트2',  date: '2025-10-25', time: '14:20', theater: '수원 1관', seat: 'B05' },
];

//  회원 목데이터
const MEMBER_RESERVS: ReservItem[] = [
  { id: '201', movie: '라라랜드',     date: '2025-10-18', time: '18:00', theater: '분당 4관', seat: 'D09' },
  { id: '202', movie: '탑건: 매버릭', date: '2025-10-21', time: '20:40', theater: '용산 1관', seat: 'E03' },
];

// 조회 함수들
export const Reservs = {
  listGuest(): ReservItem[] { return GUEST_RESERVS; },
  listMember(): ReservItem[] { return MEMBER_RESERVS; },
  getGuestById(id: string): ReservItem | undefined {
    return GUEST_RESERVS.find(r => r.id === id);
  },
  getMemberById(id: string): ReservItem | undefined {
    return MEMBER_RESERVS.find(r => r.id === id);
  },
};
