export interface Screening {
  id: number;
  movie_id: number;
  theater_id: number;
  screening_date: string; // DATE
  start_time: string; // TIME
  end_time: string;
  ticket_price: number;
}

export interface ScreeningSeat {
  id: number;
  screening_id: number;
  seat_id: number;
  theater_id: number;
  is_reserved: boolean;
}

export interface ScreeningSeatWithNumber extends ScreeningSeat {
  seat_number: string;
}

export interface Seat {
  id: number;
  theater_id: number;
  seat_number: string;
}

export interface Theater {
  id: number;
  theater_name: string;
  total_seats: number;
  seat_row: number;
  seat_col: number;
}

export interface Movie {
  id: number;
  user_email?: string | null;
  title: string;
  description: string;
  release_date: string;
  close_date: string;
  running_time: number;
  viewing_age?: number | null;
  genre: string;
  director: string;
  main_actor: string;
  created_at: string;
  modified_at?: string | null;
}

export interface Reservation {
  id: number;
  email: string;
  screening_seat_id: number;
  seat_id: number;
  screening_id: number;
  theater_id: number;
  reservation_status: 'CONFIRMED' | 'CANCELED';
  created_at: string;
  modified_at?: string | null;
}