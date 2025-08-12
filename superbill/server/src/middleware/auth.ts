import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; role: 'ADMIN' | 'ACCOUNTANT' | 'OWNER' | 'STAFF' };
}

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : undefined;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}