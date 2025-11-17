import { RequestHandler } from 'express';
import * as screeningDb from './screening-db';

export const getInfo: RequestHandler = async (req, res) => {
    res.send("테스트");
}

export const getScreening: RequestHandler = async (req, res) => {
    res.send();
}
export const screeningRegister: RequestHandler = async (req, res) => {
    const screeningData = req.body;
    try {
        const result = await screeningDb.createScreening(screeningData);
        res.status(200).send({ message: 'Screening registered successfully', data: result });
    } catch (error) {
        res.status(500).send({ message: 'Error registering screening', error });
    }   
}
export const screeningDelete: RequestHandler = async (req, res) => {
    // Implementation for deleting a screening
    res.send();
}
export const screeningUpdate: RequestHandler = async (req, res) => {
    // Implementation for updating a screening
    res.send();
}