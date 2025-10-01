import { z } from 'zod/v4';
import { WithId } from '../dbs/db-type';
import { ROLE_NAME } from './role-model';

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const userCreateSchema = z.object({
  username: z.string().trim().min(3).max(30),
  password: z.string().trim().min(6),
  full_name: z.string().min(1).max(50),
  email: z.email(),
});

export const userPublicSchema = z.object({
  id: z.bigint(),
  username: z.string(),
  role_name: z.literal(Object.values(ROLE_NAME)),
  full_name: z.string(),
});

export type UserLogin = z.infer<typeof userLoginSchema>;

export type UserCreate = z.infer<typeof userCreateSchema>;

export type UserPublic = z.infer<typeof userPublicSchema>;

export type UserExpressRequest = Pick<WithId<UserModel>, 'id'>;

export interface UserModel {
  id: bigint;
  username: string;
  email: string;
  full_name: string;
  password: string;
  role_id: bigint; // FK roles(id)
  created_at: Date;
}
