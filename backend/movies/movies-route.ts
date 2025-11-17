import express from 'express';
import { getInfo, movieRegister,movieDelete,movieUpdate } from './movies-ctrl';
const router = express.Router();

router.route('/').get(getInfo);
router.route('/register').post(movieRegister);
router.route('/delete/:id').delete(movieDelete);
router.route('/update/:id').put(movieUpdate);

export default router;