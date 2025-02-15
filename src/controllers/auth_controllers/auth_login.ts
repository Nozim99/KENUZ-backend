import { CookieOptions, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { IUser, UserRole } from '../../models/User';
import { createToken } from '../../config/jwt';
import { NODE_ENV, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_USERNAME } from '../../utils/constants';


const cookie_options: CookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'none',
  maxAge: 4 * 7 * 24 * 60 * 60 * 1000,  // 30 day
};


export const auth_login = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username?: string; password?: string } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Username and password is required' });
      return;
    }

    if (username === SUPER_ADMIN_USERNAME && password === SUPER_ADMIN_PASSWORD) {
      const admin: IUser | null = await User.findOne({ username: 'super_admin' });
      if (!admin) {
        const newSuperAdmin = new User({
          name: 'MEZES',
          username: 'super_admin',
          password: '123',
          status: UserRole.SUPER_ADMIN,
        });

        await newSuperAdmin.save();

        const token = createToken(newSuperAdmin._id.toString(), UserRole.SUPER_ADMIN);
        res
          .cookie('token', token, cookie_options)
          .cookie('role', UserRole.SUPER_ADMIN, { ...cookie_options, httpOnly: false })
          .json({ message: 'Successfully logged', token, role: UserRole.SUPER_ADMIN });

        return;
      }


      const token = createToken(admin._id.toString(), UserRole.SUPER_ADMIN);

      res
        .cookie('token', token, cookie_options)
        .cookie('role', UserRole.SUPER_ADMIN, { ...cookie_options, httpOnly: false })
        .json({ message: 'Successfully logged', token, role: UserRole.SUPER_ADMIN });
      return;
    }

    const user: IUser | null = await User.findOne({ username });

    if (!user) {
      res.status(400).json({ message: 'username or password is incorrect' });
      return;
    }

    const is_match = await bcrypt.compare(password, user.password);

    if (!is_match) {
      res.status(400).json({ message: 'username or password is incorrect' });
      return;
    }

    const token = createToken(user._id.toString(), user.status);

    res
      .cookie('token', token, cookie_options)
      .cookie('role', user.status, { ...cookie_options, httpOnly: false })
      .json({ message: 'Authenticated successfully', token, role: user.status });

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};