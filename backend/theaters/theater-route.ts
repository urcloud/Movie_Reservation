import express from 'express';
import { getTheaters, getTheaterById, registerTheater, updateTheater, deleteTheater } from './theater-ctrl';

const router = express.Router();

// 명세서에 따른 경로 매핑
router.get('/', getTheaters);       // 목록 조회
router.get('/:id', getTheaterById); // 상세 조회 
router.post('/', registerTheater);  // 등록
router.put('/:id', updateTheater);  // 수정
router.delete('/:id', deleteTheater); // 삭제

export default router;