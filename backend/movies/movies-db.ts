import { db } from '../dbs';
import { Movie } from './movies-model';

export const getMovies = async () => {
  return await db.find<Movie>('movie');
};

export const getMovieById = async (id: string) => {
  return await db.findOneById<Movie>('movie', parseInt(id));
};

export const createMovie = async (data: Omit<Movie, 'id'>) => {
  return await db.insertOne('movie', data);
};

export const deleteMovie = async (id: string) => {
  return await db.removeById<Movie>('movie', parseInt(id));
};

export const updateMovie = async (id: string, data: Partial<Movie>) => {
  return await db.updateOne('movie', data, parseInt(id));
};