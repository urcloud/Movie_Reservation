import express from 'express';
import { getAllScreenings,getScreening,screeningRegister,screeningDelete,screeningUpdate } from './screening-ctrl';
const router = express.Router();

router.route('/') 
    .get(getAllScreenings)
    .post(screeningRegister);

router.route('/:id')
    .get(getScreening)
    .put(screeningUpdate)
    .delete(screeningDelete);

export default router;