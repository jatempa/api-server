import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

const SECRET_KEY: Secret = process.env.JWT_SECRET as string;

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 5);
};

export const createJWT = (user: User | null) => {
  const token = jwt.sign(
    { id: user?.id, username: user?.username },
    SECRET_KEY
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: 'not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({ message: 'not valid token' });
    return;
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY) as JwtPayload;
    req.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send('Not authorized');
    return;
  }
};
