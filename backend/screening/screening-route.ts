import express from 'express';
import { getAllScreenings,getScreening,screeningRegister,screeningDelete,screeningUpdate } from './screening-ctrl';
const router = express.Router();

router.route('/') 
    .get(getAllScreenings)
    .post(/*authenticated, hasRole('admin')*/screeningRegister); //authenticated,hasRole 성공 시 next로 screeningRegister 호출

router.route('/:id')
    .get(getScreening)
    .put(screeningUpdate)
    .delete(screeningDelete);

export default router;