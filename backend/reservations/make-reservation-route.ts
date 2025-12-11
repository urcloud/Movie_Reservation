import express from 'express';
import { getScreenings, getScreeningById, getScreeningSeats, createReservation, getScreeningMovie, getScreeningTheater } from './make-reservation-ctrl';
import { requireLogin } from '../auth/auth-ctrl';
const router = express.Router();

router.route('/screenings').get(getScreenings);
router.route('/screenings/:id').get(getScreeningById);
router.route('/screenings/:id/seats').get(getScreeningSeats);
router.route('/reservations').post(requireLogin, createReservation);
router.route("/screenings/:id/movie").get(getScreeningMovie);
router.route("/screenings/:id/theater").get(getScreeningTheater);

export default router;