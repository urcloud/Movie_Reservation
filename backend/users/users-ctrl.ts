import bcrypt from "bcryptjs";
import { RequestHandler } from "express";
import * as usersDb from './users-db';

// 회원가입
export const signup: RequestHandler = async (req, res) => {
  try {
    const user = req.body;
    // 1) 필수값 누락 확인
    if (!user.email) {
      res.status(400).send('이메일 누락');
    }
    if (!user.password) {
      res.status(400).send('비밀번호 누락');
    }
    if (!user.member_name) {
      res.status(400).send('이름 누락');
    }
    if (!user.birthday) {
      res.status(400).send('생년월일 누락');
    }

    // 2) user exists
    const userExist = await usersDb.findUserByEmail(user.email);
    if (userExist) {
      return res.status(409).send('user가 이미 있습니다.');
    }

    // 3) password hash
    const hash = bcrypt.hashSync(user.password);
    const role = await usersDb.findRoleByName('member');

    const result = await usersDb.createUser({
      ...user,
      role_id: role?.id,
      password: hash,
    });

    res.status(201).json({ ok: true, message: '회원가입 성공' });
  } catch (error: any) {
    console.log('error: ', error);
    return res.status(500).send(error.message);
  }
};
