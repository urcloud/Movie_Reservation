export interface Screening {
  screeningId: number;
  movieId: number;
  theaterId: number;
  screeningDate: Date;
  startTime: string;
  endTime: string;
  ticketPrice: number;
}
