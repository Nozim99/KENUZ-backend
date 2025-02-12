import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/constants';
import { upload_image } from '../services/cloudinary_services';


export const createToken = (payload: object): string => {
  const signOptions: SignOptions = {
    expiresIn: '30d',
  };

  return jwt.sign(payload, JWT_SECRET, signOptions);
};

export const verifyToken = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error while validating JWT:', error);
    return null;
  }
};