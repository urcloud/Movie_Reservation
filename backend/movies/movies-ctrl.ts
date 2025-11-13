import { RequestHandler } from 'express';
import * as moviesDb from './movies-db';

export const getInfo: RequestHandler = async (req, res) => {
    res.send("테스트");
}

export const getScreening: RequestHandler = async (req, res) => {
    res.send();
}