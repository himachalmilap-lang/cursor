import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export type JwtPayload = {
  userId: string;
  role: 'ADMIN' | 'ACCOUNTANT' | 'OWNER' | 'STAFF';
};

export function signJwt(payload: JwtPayload, expiresIn: string = '7d') {
  const options: SignOptions = { expiresIn } as SignOptions;
  return jwt.sign(payload as object, env.jwtSecret as unknown as jwt.Secret, options);
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret as unknown as jwt.Secret) as JwtPayload;
}