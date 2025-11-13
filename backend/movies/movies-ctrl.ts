import { RequestHandler } from 'express';
import * as moviesDb from './movies-db';

export const getInfo: RequestHandler = async (req, res) => {
    res.send("테스트");
}

export const movieRegister: RequestHandler = async (req, res) => {
    const movieData = req.body;
    try {
        const result = await moviesDb.createUser(movieData);
        res.status(201).send({ message: 'Movie registered successfully', data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error registering movie', error });
    }
}