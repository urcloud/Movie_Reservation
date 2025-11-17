import { db } from '../dbs';
import { Screening } from './screening-model';

export const createScreening = async (user: Screening) => {
  return await db.insertOne('screening', user);
};
export const deleteScreening = async (id: string) => {
  return await db.removeById<Screening>('Screening', parseInt(id));
}
export const updateScreening = async (id: string, screening: Partial<Screening>) => {
  return await db.updateOne('Screening', screening, parseInt(id));
}