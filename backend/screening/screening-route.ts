import express from 'express';
import { getInfo,screeningRegister,screeningDelete,screeningUpdate } from './screening-ctrl';
const router = express.Router();

router.route('/').get(getInfo);
router.route('/register').post(screeningRegister);
router.route('/delete/:id').delete(screeningDelete);
router.route('/update/:id').put(screeningUpdate);

export default router;