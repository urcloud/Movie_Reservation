import { RequestHandler } from 'express';
import * as theaterDb from './theater-db';

// 좌석 이름 생성
const generateSeatData = (theaterId: number, rows: number, cols: number) => {
  const seats = [];
  for (let r = 0; r < rows; r++) {
    const rowChar = String.fromCharCode(65 + r); // 0->A, 1->B
    for (let c = 1; c <= cols; c++) {
      seats.push({
        theater_id: theaterId,
        seat_number: `${rowChar}${c}`,
      });
    }
  }
  return seats;
};

// 1. 조회 (GET /api/theaters)
export const getTheaters: RequestHandler = async (req, res) => {
  try {
    const theaters = await theaterDb.findAllTheaters();
    if (!theaters || theaters.length === 0) {
      
      return res.status(200).json([]); 
    }

    const response = theaters.map((t) => ({
      theaterId: t.id,
      theaterName: t.theater_name,
      rows: t.seat_row,
      cols: t.seat_col,
      totalSeats: t.total_seats,
    }));
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 2. 상세 조회 
export const getTheaterById: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const t = await theaterDb.findTheaterById(id);
    if (!t) return res.status(404).json({ message: '상영관 없음' });

    const seats = await theaterDb.findSeatsByTheaterId(id);

    res.json({
      theaterId: t.id,
      theaterName: t.theater_name,
      rows: t.seat_row,
      cols: t.seat_col,
      totalSeats: t.total_seats,
      seats: seats.map(s => ({ seatId: s.id, seatNumber: s.seat_number })),
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류' });
  }
};

// 3. 등록 (POST /api/theaters)
export const registerTheater: RequestHandler = async (req, res) => {
  try {
    const { theaterName, rows, cols } = req.body;

    //0이면(400)
    if (!theaterName || rows <= 0 || cols <= 0) {
      return res.status(400).json({ message: '잘못된 요청 데이터입니다.' });
    }

    //중복(409)
    const exists = await theaterDb.findTheaterByName(theaterName);
    if (exists) {
      return res.status(409).json({ message: '이미 존재하는 상영관 이름입니다.' });
    }

    // 상영관 저장
    const newTheater = await theaterDb.createTheater({
      theater_name: theaterName,
      seat_row: rows,
      seat_col: cols,
      total_seats: rows * cols,
    });

    if (!newTheater) throw new Error('상영관 생성 실패');

    // 좌석 데이터
    const seatData = generateSeatData(Number(newTheater.id), rows, cols);
    const savedSeats = await theaterDb.createSeats(seatData); // insertMany 결과가 배열로 온다고 가정

    // 응답 (201)
    res.status(201).json({
      theaterId: newTheater.id,
      theaterName: newTheater.theater_name,
      rows: newTheater.seat_row,
      cols: newTheater.seat_col,
      totalSeats: newTheater.total_seats,
      seats: savedSeats?.map((s: any) => ({ seatId: s.id, seatNumber: s.seat_number })) || [],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'DB 저장 중 오류 발생' });
  }
};

// 4. 수정 (PUT /api/theaters/:id)
export const updateTheater: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { theaterName, rows, cols } = req.body;

    // 0이면(400)
    if (rows !== undefined && (rows <= 0 || cols <= 0)) {
        return res.status(400).json({message: 'Rows/Cols는 양수여야 합니다.'});
    }

    // 유무 (404)
    const current = await theaterDb.findTheaterById(id);
    if (!current) return res.status(404).json({ message: '상영관을 찾을 수 없습니다.' });

    // 이름 중복 확인 (409)
    if (theaterName && theaterName !== current.theater_name) {
       const dup = await theaterDb.findTheaterByName(theaterName);
       if (dup) return res.status(409).json({ message: '이미 사용 중인 이름입니다.' });
    }

    // 업데이트 데이터
    const updateData: any = {};
    if (theaterName) updateData.theater_name = theaterName;
    
    let seatsChanged = false;
    // 행/열 변경 시 로직
    if (rows && cols && (rows !== current.seat_row || cols !== current.seat_col)) {
        updateData.seat_row = rows;
        updateData.seat_col = cols;
        updateData.total_seats = rows * cols;
        seatsChanged = true;
    }

    // 상영관 업데이트
    const updated = await theaterDb.updateTheater(id, updateData);
    console.log(" updated 값 확인:", updated);
    let finalSeats = [];
    if (seatsChanged) {
        // 기존 좌석 삭제
        await theaterDb.deleteSeatsByTheaterId(id);
        // 새 좌석 생성
        const newSeatData = generateSeatData(id, Number(updated.seat_row), Number(updated.seat_col));
        const saved = await theaterDb.createSeats(newSeatData);
        finalSeats = saved || [];
    } else {
        // 변경 없으면 다시 데이터
        finalSeats = await theaterDb.findSeatsByTheaterId(id);
    }

    // 응답 (200)
    res.status(200).json({
        theaterId: updated.id,
        theaterName: updated.theater_name,
        rows: updated.seat_row,
        cols: updated.seat_col,
        totalSeats: updated.total_seats,
        seats: finalSeats.map((s: any) => ({ seatId: s.id, seatNumber: s.seat_number })),
        
        
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '수정 중 오류 발생' });
  }
};

// 5. 삭제 (DELETE /api/theaters/:id)
export const deleteTheater: RequestHandler = async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    // 유무 (404)
    const current = await theaterDb.findTheaterById(id);
    if (!current) return res.status(404).json({ message: '상영관이 존재하지 않습니다.' });

    await theaterDb.deleteTheater(id);
    
    // 응답 (200)
    res.status(200).json({
        message: "상영관이 성공적으로 삭제되었습니다.",
        theaterId: id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '삭제 중 오류 발생' });
  }
};