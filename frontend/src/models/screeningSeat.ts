export interface ScreeningSeat {
  id: number; //screening_seat_id
  screening_id: number;
  seat_id: number;
  theater_id: number;
  is_reserved: boolean;
  seat_number: string;
}