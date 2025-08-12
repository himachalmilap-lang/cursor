import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export function requireRole(...allowed: Array<'ADMIN' | 'ACCOUNTANT' | 'OWNER' | 'STAFF'>) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role || !allowed.includes(role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}