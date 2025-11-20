import { RequestHandler } from 'express';
import * as moviesDb from './movies-db';

export const getInfo: RequestHandler = async (req, res) => {
    res.send("테스트");
}

export const movieRegister: RequestHandler = async (req, res) => {
    const movieData = req.body;
    try {
        const result = await moviesDb.createMovie(movieData);
        res.status(200).send({ message: 'Movie registered successfully', data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error registering movie', error });
    }
}

export const movieDelete: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await moviesDb.deleteMovie(id);
        if (!result) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.send();
        res.status(200).send({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting movie', error });
    }
}
export const movieUpdate: RequestHandler = async (req, res) => {
 try {
        const { id } = req.params;
        const movieData = req.body;
        const result = await moviesDb.updateMovie(id, movieData);

        if (!result) {
            return res.status(404).send({ message: 'Movie not found' });
        }
        res.status(200).send({ message: 'Movie updated successfully', data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error updating movie', error });
    }
}