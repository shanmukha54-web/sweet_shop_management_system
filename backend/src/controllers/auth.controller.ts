import { Request, Response } from 'express';
import * as authService from '../services/auth.services';

export async function register(req: Request, res: Response) {
  const { email, password, name, role } = req.body;
  const user = await authService.register({ email, password, name, role });
  res.status(201).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await authService.login({ email, password });
  res.json({ token });
}
