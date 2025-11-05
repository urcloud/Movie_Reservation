export interface Screening {
  screeningId: number; // ERD: screeningID LONG
  movieId: number; // ERD: movieID LONG
  theaterId: number; // ERD: theaterID LONG
  screeningDate: string; // ERD: screeningDate DATE
  startTime: string; // ERD: startTime DATETIME
  endTime: string; // ERD: endTime DATETIME
  ticketPrice: number; // ERD: ticketPrice INT
}
