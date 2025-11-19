import jwt from "jsonwebtoken";
import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import * as authDb from './auth-db';

const SECRET = "MY_SECRET_KEY";

export const getUser: RequestHandler = async (req, res) => {
    try {
        if (req.cookies.butterStudio) {
            const token = req.cookies.butterStudio;
            // const { id, role } = jwt.verify(token, config.jwtSecret);
            // res.json( { id, role } );
        } else {
            res.json({ id: 0, role: "user" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send("유저를 가져오지 못했습니다.");
    }
}


 export const login: RequestHandler = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const userInfo = req.body;
    const user = userInfo; 
    //const user = await authDb.findUserByEmail(userInfo.email);
    /*if (!user) {
      throw new Error('사용자가 없습니다');
    }
    const matchPassword = bcrypt.compareSync(userInfo.password, user.password);
    if (!matchPassword) {
      throw new Error('비밀번호가 틀렸습니다.');
    }*/
    const token = jwt.sign({id: user.id, email: user.email},SECRET, {expiresIn:'1h'});
    res.cookie('token', token, {httpOnly: true, secure: true, maxAge: 3600000})
    res.status(200).json({success:true, message: '로그인 성공'})
    res.json(req.body);
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: '로그인 중 에러 발생' })
  }
};

// 로그아웃
export const logout: RequestHandler = async (req, res) => {
    try {
        //res.clearCookie(config.cookieName);
        res.json({
            id: 1000,
            role: "guest",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send("로그인 에러");
    }
}


export const signup: RequestHandler = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).send("로그인 에러");
  }
};