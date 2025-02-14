import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import { UserRole } from '../models/User';


export const createToken = (userId: string, role: UserRole): string => {
  const signOptions: SignOptions = {
    expiresIn: '30d',
  };

  return jwt.sign({ userId, role }, JWT_SECRET, signOptions);
};


export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error while validating JWT:', error);
    return null;
  }
};