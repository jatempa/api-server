import { Request, Response } from 'express';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    res.json({ message: 'error duplicate user' });
  }
};

export const signin = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(
    req.body.password,
    user?.password as string
  );

  if (!isValid) {
    res.status(401);
    res.json({ message: 'nope' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
