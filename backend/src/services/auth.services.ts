import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function register({ email, password, name, role }: { email: string; password: string; name?: string; role?: string }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw { statusCode: 400, message: 'Email already registered' };

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name,
      role: role === 'ADMIN' ? 'ADMIN' : 'USER',
    },
  });
  return user;
}

export async function login({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw { statusCode: 401, message: 'Invalid credentials' };

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw { statusCode: 401, message: 'Invalid credentials' };

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return token;
}
