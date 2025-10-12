// src/mocks/bookings.ts
export type Booking = {
  id: string;
  movie: string;
  date: string;   // yyyy-MM-dd
  time: string;   // HH:mm
  theater: string;
  seat: string;
  // 필요시 status 등 추가 가능
};

// 게스트/회원 더미 데이터
const GUEST: Booking[] = [
  { id: '101', movie: '인터스텔라',  date: '2025-10-20', time: '19:30', theater: '강남 3관', seat: 'A12' },
  { id: '102', movie: '오펜하이머',  date: '2025-10-22', time: '21:10', theater: '용산 2관', seat: 'C07' },
  { id: '103', movie: '듄: 파트2',  date: '2025-10-25', time: '14:20', theater: '수원 1관', seat: 'B05' },
];

const MEMBER: Booking[] = [
  { id: '201', movie: '라라랜드',    date: '2025-10-18', time: '18:00', theater: '분당 4관', seat: 'D09' },
  { id: '202', movie: '탑건: 매버릭', date: '2025-10-21', time: '20:40', theater: '용산 1관', seat: 'E03' },
];

// --- 공개 API (페이지에서 이 함수들만 사용) ---
export const Bookings = {
  // 목록
  listGuest(): Booking[] { return GUEST; },
  listMember(): Booking[] { return MEMBER; },

  // 단건
  getGuestById(id: string): Booking | undefined {
    return GUEST.find(b => b.id === id);
  },
  getMemberById(id: string): Booking | undefined {
    return MEMBER.find(b => b.id === id);
  },

};
