import type { ScreeningSeat } from "../models/screeningSeat";
import { mockSeats } from "./seats";

function getRandomBoolean(probability = 0.2) {
  // 20% 확률로 예약됨
  return Math.random() < probability;
}

export const mockScreeningSeats: ScreeningSeat[] = [];

let screeningSeatIdCounter = 1;

// screeningId 1~8 (각 상영마다 전체 좌석에 대해 예약 여부 생성)
for (let screeningId = 1; screeningId <= 8; screeningId++) {
  mockSeats.forEach((seat) => {
    mockScreeningSeats.push({
      screeningSeatId: screeningSeatIdCounter++,
      screeningId,
      theaterId: seat.theaterId,
      seatId: seat.seatId,
      isReserved: getRandomBoolean(),
    });
  });
}
