import type { Screening } from '../models/screening';

export const mockScreenings: Screening[] = [
  {
  screeningId: 1,
  movieId: 1,
  theaterId: 1,
  screeningDate:'2019-05-30',
  startTime: '2019-05-30T10:00:00Z',
  endTime: '2019-05-30T12:12:00Z',
  ticketPrice: 12000,
  },
  {
  screeningId: 2,
  movieId: 2,
  theaterId: 1,
  screeningDate:'2019-05-30',
  startTime: '2019-05-30T12:30:00Z',
  endTime: '2019-05-30T14:42:00Z',
  ticketPrice: 12000,
  },
  {
  screeningId: 3,
  movieId: 1,
  theaterId: 2,
  screeningDate:'2019-05-31',
  startTime: '2019-05-31T10:00:00Z',
  endTime: '2019-05-31T12:12:00Z',
  ticketPrice: 12000,
  }
];
