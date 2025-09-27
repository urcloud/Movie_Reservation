import { z } from 'zod/v4';
import { WithId } from '../dbs/db-type';

export const authUserSchema = z.object({
  id: z.bigint(),
  username: z.string(),
  role: z.string(),
});

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const registerUserSchema = z.object({
  username: z.string().trim().min(3).max(30),
  password: z.string().trim().min(6),
  name: z.string().min(1).max(50),
  email: z.email(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

export type LoginUser = z.infer<typeof loginUserSchema>;

export type RegisterUser = z.infer<typeof registerUserSchema>;

export type ResponseUser = {
  id: bigint;
  username: string;
  role: string;
  name: string;
};

export type ExpressUserRequest = Pick<WithId<UserModel>, 'id'>;

export interface UserModel {
  username: string;
  email: string;
  name: string;
  password: string;
  role_id: bigint; // FK roles(id)
  created_at?: Date;
}
