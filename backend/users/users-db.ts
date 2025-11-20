import { db } from '../dbs';
import { TABLE_NAMES } from '../dbs/db-constant';
import { User } from '../auth/auth-model';

export const createUser = async (user: User) => {
  return await db.insertOne(TABLE_NAMES.users, user);
};

export const findUserByEmail = async (email: string) => {
  return await db.findOne<User>(TABLE_NAMES.users, { email });
};

export const findRoleByName = async (name:string) => {
 const role = await db.findOne(TABLE_NAMES.role,{role_name:name}) 
 return role
}