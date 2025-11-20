import { db } from '../dbs';
import { Movie } from './movies-model';

export const createMovie = async (movie: Movie) => {
  return await db.insertOne('Movie', movie);
};
export const deleteMovie = async (id: string) => {
  return await db.removeById<Movie>('Movie', parseInt(id));
}
export const updateMovie = async (id: string, movie: Partial<Movie>) => {
  return await db.updateOne('Movie', movie, parseInt(id));
}