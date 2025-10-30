import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import * as authDb from './auth-db';

export const login: RequestHandler = async (req, res) => {
  console.log('req.body', req.body);
  const userInfo = req.body;
  const user = await authDb.findUserByEmail(userInfo.email);
  if (!user) {
    throw new Error('사용자가 없습니다');
  }
  const matchPassword = bcrypt.compareSync(userInfo.password, user.password);
  if (!matchPassword) {
    throw new Error('비밀번호가 틀렸습니다.');
  }
  res.json(req.body);
};

export const signup: RequestHandler = async (req, res) => {
  const user = req.body;
  console.log('user', user);
  // 1) user exists
  const userExist = await authDb.findUserByEmail(user.email);
  if (userExist) {
    throw new Error('user가 이미 있습니다.');
  }
  // 2) password hash
  const hash = bcrypt.hashSync(user.password);
  const result = await authDb.createUser({ ...user, password: hash });
  res.json(result);
};
