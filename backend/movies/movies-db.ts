import { db } from '../dbs';
import { Movies } from './movies-model';

export const createUser = async (movies: Movies) => {
  return await db.insertOne('Movies', movies);
};