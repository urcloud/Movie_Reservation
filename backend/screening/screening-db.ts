import { db } from '../dbs';
import { Screening } from './screening-model';

export const getScreenings = async () => {
  return await db.find<Screening>('screening');
};
export const getScreeningById = async (id: string) => {
  return await db.findOneById<Screening>('screening', parseInt(id));
};
export const getScreeningsByMovieId = async (movieId: string) => {
  return await db.find<Screening>('screening', { movieid: parseInt(movieId) });
};
export const createScreening = async (data: Omit<Screening, 'screeningid'>) => {
  return await db.insertOne('screening', data);
};
export const deleteScreening = async (id: string) => {
  return await db.removeById<Screening>('Screening', parseInt(id));
}
export const updateScreening = async (id: string, screening: Partial<Screening>) => {
  return await db.updateOne('Screening', screening, parseInt(id));
}