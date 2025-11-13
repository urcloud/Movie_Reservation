import { db } from '../dbs';
import { Screening } from './screening-model';

export const createUser = async (user: Screening) => {
  return await db.insertOne('screenings', user);
};