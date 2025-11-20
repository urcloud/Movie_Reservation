// DB 테이블 구조 (Snake case)
export type TheaterModel = {
  id: number;
  theater_name: string;
  total_seats: number;
  seat_row: number;
  seat_col: number;
};

export type SeatModel = {
  id: number;
  theater_id: number;
  seat_number: string;
};

// API 명세서 Request/Response 구조 (Camel case)
export type TheaterDto = {
  theaterId: number;
  theaterName: string;
  rows: number;
  cols: number;
  totalSeats: number;
  seats?: { seatId: number; seatNumber: string }[];
};