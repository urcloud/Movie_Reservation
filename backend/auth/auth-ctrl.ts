import jwt from 'jsonwebtoken';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import bcrypt from 'bcryptjs';
import * as usersDb from '../users/users-db';
import { appConfig } from '../configs/app-config';

export const getUser: RequestHandler = async (req, res) => {
  try {
    console.log(req.auth);
    const { email } = req.auth;
    const user = await usersDb.findUserByEmail(email);

    if (!user) {
      return res.status(404).send('사용자가 없습니다.');
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    const newToken = jwt.sign(
      { email: user.email, role_name: user.role_name },
      appConfig.jwtSecret,
      { expiresIn: '1h' }, // 만료 시간은 자유롭게 조절
    );

    // 5) 쿠키에 다시 저장
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    res.status(200).json({
      ok: true,
      role_name: 'member',
      member_name: user.member_name,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('유저를 가져오지 못했습니다.');
  }
};

// 로그인
export const login: RequestHandler = async (req, res) => {
  try {
    const userInfo = req.body;
    if (!userInfo.email) {
      res.status(400).send('이메일 없음');
    }
    if (!userInfo.password) {
      res.status(400).send('비밀번호가 없음');
    }
    const user = (await usersDb.findUserByEmail(userInfo.email)) as any;
    if (!user) {
      res.status(404).send('존재하지 않는 이메일');
    }
    const matchPassword = bcrypt.compareSync(userInfo.password, user.password);
    if (!matchPassword) {
      res.status(401).send('비밀번호 불일치');
    }
    const token = jwt.sign(
      { email: user.email, role_name: user.role_name },
      appConfig.jwtSecret,
      {
        expiresIn: '1h',
      },
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });
    res.status(200).json({
      ok: true,
      message: '로그인 성공',
      role_name: 'member',
      member_name: user.member_name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '로그인 중 에러 발생' });
  }
};

// 로그아웃
export const logout: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).send('로그인하지 않은 사용자');
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send('로그인 에러');
  }
};

export const requireLogin: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('로그인하지 않은 사용자');
    }
    try {
      let payload;
      payload = jwt.verify(token, appConfig.jwtSecret);
      req.auth = payload;
      next();
    } catch (error) {
      console.log('error: ', error);
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다.');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send('로그인 에러');
  }
};

export const hasRole = (roleName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role_name } = req.auth;
    if (role_name === roleName) {
      next();
    } else {
      return res.status(401).send('로그인 에러');
    }
  };
};
