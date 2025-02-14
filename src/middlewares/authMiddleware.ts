import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      res.status(401).json({ message: 'Token required' });
      return;
    }

    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }

      const userData = decoded as { userId: string; role: string };

      if (!userData || !userData.userId || !userData.role) {
        res.status(401).json({ message: 'Invalid user data' });
        return;
      }

      const user: IUser | null = await User.findById(userData.userId);

      if (!user) {
        res
          .status(401)
          .cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
          })
          .cookie('role', '', {
            httpOnly: false,
            expires: new Date(0),
          })
          .json({ message: 'User not found' });
        return;
      }
      if (!user.active) {
        res.status(401).json({ message: 'User not active' });
        return;
      }

      req.user = userData;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res
          .status(401)
          .cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
          })
          .json({ message: 'Token expired' });

        return;
      }
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
