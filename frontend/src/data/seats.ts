import type { Seat } from "../models/seat";

export const mockSeats: Seat[] = [
  // 1관 (5행 6열)
  ...Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from({ length: 6 }, (_, colIndex) => ({
      seatId: rowIndex * 6 + colIndex + 1,
      theaterId: 1,
      seatNumber: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
    }))
  ).flat(),

  // 2관 (5행 8열)
  ...Array.from({ length: 5 }, (_, rowIndex) =>
    Array.from({ length: 8 }, (_, colIndex) => ({
      seatId: 30 + rowIndex * 8 + colIndex + 1,
      theaterId: 2,
      seatNumber: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
    }))
  ).flat(),

  // 3관 (4행 5열)
  ...Array.from({ length: 4 }, (_, rowIndex) =>
    Array.from({ length: 5 }, (_, colIndex) => ({
      seatId: 70 + rowIndex * 5 + colIndex + 1,
      theaterId: 3,
      seatNumber: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
    }))
  ).flat(),
];
