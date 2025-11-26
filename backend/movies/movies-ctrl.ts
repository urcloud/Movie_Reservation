import { RequestHandler } from 'express';
import * as moviesDb from './movies-db';

// [Helper] 에러 메시지 추출
const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const getAllMovies: RequestHandler = async (req, res) => {
  try {
    const result = await moviesDb.getMovies();
    res.status(200).json(result);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message: '영화 목록 조회 중 오류가 발생했습니다.', error: message });
  }
};

export const getMovie: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await moviesDb.getMovieById(id);

    if (!result) {
      return res.status(404).send({ message: '영화를 찾을 수 없습니다.' });
    }

    res.status(200).json(result);
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message: '영화 상세 조회 중 오류가 발생했습니다.', error: message });
  }
};

export const movieRegister: RequestHandler = async (req, res) => {
  const { 
    title, director, main_actor, genre, description, 
    release_date, close_date, running_time, viewing_age 
  } = req.body;

  if (!title || !director || !release_date || !running_time || !genre) {
    return res.status(400).send({
      message: '필수 값이 누락되었습니다. (title, director 등)',
    });
  }

  try {
    const result = await moviesDb.createMovie(req.body);
    res.status(201).send({ message: '영화가 성공적으로 등록되었습니다.', data: result });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message: '영화 등록 중 오류가 발생했습니다.', error: message });
  }
};

export const movieDelete: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await moviesDb.deleteMovie(id);

    if (!result) {
      return res.status(404).send({ message: '존재하지 않는 영화입니다.' });
    }

    res.status(200).send({ message: '영화가 성공적으로 삭제되었습니다.', data: result });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message: '영화 삭제 중 오류가 발생했습니다.', error: message });
  }
};

export const movieUpdate: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const movieData = req.body;

  if (!movieData || Object.keys(movieData).length === 0) {
    return res.status(400).send({ message: '수정할 값이 없습니다.' });
  }

  try {
    const result = await moviesDb.updateMovie(id, movieData);

    if (!result) {
      return res.status(404).send({ message: '존재하지 않는 영화입니다.' });
    }

    res.status(200).send({ message: '영화 정보가 수정되었습니다.', data: result });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(message);
    res.status(500).send({ message: '영화 수정 중 오류가 발생했습니다.', error: message });
  }
};