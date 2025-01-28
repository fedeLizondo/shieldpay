import { NextFunction, Request, Response } from 'express';
import { authHandler } from '../application/authHandler';
import { userPostrgresRepository } from './persistence/postrgres/userPostrgresRepository';
import { TokenPostgresRepository } from './persistence/postrgres/tokenPostrgresRepository';
import { AuthRequest } from '../../shared/authRequest';
import { UserAlreadyExist } from '../domain/errors/userAlreadyExist';

const authHandlerT = authHandler(new userPostrgresRepository(), new TokenPostgresRepository());

export async function singIn(req: Request, res: Response) {
  const { email, password } = req.body;
  try {

    const token = await authHandlerT.signIn(email, password);
    res.status(200).json({ message: 'Authentication successful', token });
  } catch (error) {
    if (error instanceof UserAlreadyExist) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const user = await authHandlerT.signUp(email, password);
    const token = await authHandlerT.signIn(email, password);
    res.status(201).json({ id: user.id, email: user.email, token });
  } catch (error) {
    if (error instanceof UserAlreadyExist) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

}

export async function signOut(req: AuthRequest, res: Response) {
  const { userId, token } = req;
  const response = await authHandlerT.signOut(userId || '', token || '');
  res.status(204).end();
}