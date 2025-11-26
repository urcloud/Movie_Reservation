import express from 'express';
import { getAllMovies, getMovie, movieRegister, movieDelete, movieUpdate } from './movies-ctrl'; 
const router = express.Router();

router.route('/')
    .get(getAllMovies)
    .post(movieRegister);

router.route('/:id')
    .get(getMovie)
    .put(movieUpdate)
    .delete(movieDelete);

export default router;