import { Request, Response } from 'express';
import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { signJwt } from '../utils/jwt';

export async function register(req: Request, res: Response) {
  const { email, name, password, role } = req.body as { email: string; name: string; password: string; role?: any };
  if (!email || !name || !password) return res.status(400).json({ message: 'Missing fields' });
  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already exists' });
  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, name, passwordHash, role: role || 'OWNER' });
  const token = signJwt({ userId: user.id, role: user.role });
  res.status(201).json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signJwt({ userId: user.id, role: user.role });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
}

export async function me(req: Request & { user?: any }, res: Response) {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  const user = await User.findById(req.user.userId).select('email name role');
  res.json({ user });
}