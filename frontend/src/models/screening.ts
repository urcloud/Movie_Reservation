export interface Screening {
  id: number; //screening_id
  movie_id: number;
  theater_id: number;
  screening_date: Date;
  start_time: string;
  end_time: string;
  ticket_price: number;
  movie_title: string;
}

export interface ScreeningWithTheater extends Screening {
  theater_name: string;
  seat_row: number;
  seat_col: number;
  total_seats: number;
}
