import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import * as authDb from './auth-db';
import { appConfig } from '../configs/app-config';

export const getUser: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).send('쿠키에 토큰이 없습니다');
    }

    let payload: any;
    try {
      payload = jwt.verify(token, appConfig.jwtSecret);
    } catch (err) {
      console.log('err: ', err);
      return res.status(401).send('토큰이 만료되었거나 유효하지 않습니다.');
    }

    const { email } = payload;
    const user = await authDb.findUserByEmail(email);

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
      { id: user.id, email: user.email },
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
    const user = (await authDb.findUserByEmail(userInfo.email)) as any;
    if (!user) {
      res.status(404).send('존재하지 않는 이메일');
    }
    const matchPassword = bcrypt.compareSync(userInfo.password, user.password);
    if (!matchPassword) {
      res.status(401).send('비밀번호 불일치');
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
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
    const userExist = await authDb.findUserByEmail(user.email);
    if (userExist) {
      return res.status(409).send('user가 이미 있습니다.');
    }

    // 3) password hash
    const hash = bcrypt.hashSync(user.password);
    const role = await authDb.findRoleByName('member');

    const result = await authDb.createUser({
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
