import { db } from '../dbs';
import { Screening } from './screening-model';

export const getScreenings = async () => {
  return await db.find<Screening>('screening');
};

export const getScreeningById = async (id: string) => {
  return await db.findOneById<Screening>('screening', parseInt(id));
};

export const getScreeningsByMovieId = async (movie_id: string) => {
  return await db.find<Screening>('screening', { movie_id: parseInt(movie_id) } as any);
};

export const createScreening = async (data: Omit<Screening, 'screening_id'>) => {
  return await db.insertOne('screening', data);
};

export const deleteScreening = async (id: string) => {
  return await db.removeById<Screening>('screening', parseInt(id));
};

export const updateScreening = async (id: string, screening: Partial<Screening>) => {
  return await db.updateOne('screening', screening, parseInt(id));
};