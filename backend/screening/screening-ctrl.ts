import { RequestHandler } from 'express';
import * as screeningDb from './screening-db';

export const getAllScreenings: RequestHandler = async (req, res) => {
  try {
    const result = await screeningDb.getScreenings();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '오류가 발생했습니다.', error });
  }
};

export const getScreening: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await screeningDb.getScreeningById(id);

    if (!result) {
      return res.status(404).send({ message: 'Screening not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '오류가 발생했습니다.', error });
  }
};

export const screeningRegister: RequestHandler = async (req, res) => {
  // 401 로그인하지 않은 사용자, 403 권한없는 시용자 체크 필요

  const { movieid, theaterid, screeningdate, starttime, endtime, ticketprice } = req.body;
  if (!movieid || !theaterid || !screeningdate || !starttime || !endtime || !ticketprice) {
    return res.status(400).send({
      message: '잘못된 요청입니다. 필수 값이 누락되었습니다. (movieid, theaterid 등)',
    });
  }

  try {
    const result = await screeningDb.createScreening(req.body);
    res.status(201).send({ message: '성공적으로 등록되었습니다.', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '오류가 발생했습니다.', error });
  }
};

export const screeningDelete: RequestHandler = async (req, res) => {
  // 401 로그인하지 않은 사용자, 403 권한없는 시용자 체크 필요
  const { id } = req.params;

  try {
    const result = await screeningDb.deleteScreening(id);

    if (!result) {
      return res.status(404).send({ message: '존재하지 않는 상영 정보입니다.' });
    }

    res.status(200).send({ message: '성공적으로 삭제되었습니다.', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '오류가 발생했습니다.', error });
  }
};

export const screeningUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const screeningData = req.body;
  if (Object.keys(screeningData).length === 0) {
    return res.status(400).send({ message: '수정할 값이 없습니다.' });
  }

  try {
    const result = await screeningDb.updateScreening(id, screeningData);

    if (!result) {
      return res.status(404).send({ message: '존재하지 않는 상영 정보입니다.' });
    }

    res.status(200).send({ message: '수정 성공!', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: '오류가 발생했습니다.', error });
  }
};