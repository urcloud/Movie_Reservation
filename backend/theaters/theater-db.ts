import { db } from '../dbs';
import { TABLE_NAMES } from '../dbs/db-constant';
import { TheaterModel, SeatModel } from './theater-model';

// 1. 전체 목록 조회
export const findAllTheaters = async () => {
  return await db.find<TheaterModel>(TABLE_NAMES.theater, {}, { sort: { id: 'asc' } });
};

// 2. ID로 조회
export const findTheaterById = async (id: number) => {
  return await db.findOneById<TheaterModel>(TABLE_NAMES.theater, id);
};

// 3. 이름으로 조회 (중복 체크용)
export const findTheaterByName = async (name: string) => {
  return await db.findOne<TheaterModel>(TABLE_NAMES.theater, { theater_name: name });
};

// 4. 상영관 생성
export const createTheater = async (theater: Omit<TheaterModel, 'id'>) => {
  return await db.insertOne(TABLE_NAMES.theater, theater);
};

// 5. 상영관 수정
export const updateTheater = async (id: number, theater: Partial<TheaterModel>) => {
  return await db.updateOne(TABLE_NAMES.theater, theater, id);
};

// 6. 상영관 삭제
export const deleteTheater = async (id: number) => {
  return await db.removeById(TABLE_NAMES.theater, id);
};

// --- 좌석 관련 ---

// 7. 특정 상영관의 좌석 모두 조회
export const findSeatsByTheaterId = async (theaterId: number) => {
   return await db.find<SeatModel>('seat', { theater_id: theaterId } as any, { sort: { id: 'asc' } });
};

// 8. 좌석 여러개 생성
export const createSeats = async (seats: Omit<SeatModel, 'id'>[]) => {
  return await db.insertMany('seat', seats);
};

// 9. 특정 상영관 좌석 모두 삭제 (수정 시 사용)
export const deleteSeatsByTheaterId = async (theaterId: number) => {
  return await db.remove('seat', { theater_id: theaterId } as any);
};