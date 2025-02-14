import { Response } from 'express';
import User, { UserRole } from '../../models/User';
import { AuthRequest } from '../../middlewares/authMiddleware';
import { hashPassword } from '../../utils/hashPassword';


export const user_create = async (req: AuthRequest, res: Response) => {
  try {
    const {
      first_name,
      username,
      password,
      status,
    } = req.body;


    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    if (
      (status === UserRole.ADMIN && req.user.role !== UserRole.SUPER_ADMIN)
      ||
      (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.SUPER_ADMIN)
    ) {
      res.status(401).json({ message: 'No permission to create' });
      return;
    }
    if (!first_name || !username || !password) {
      res.status(401).json({ message: 'Invalid data' });
      return;
    }

    const hash_password = await hashPassword(password);

    const newUser = new User({
      name: first_name,
      password: hash_password,
      username,
      status,
    });

    await newUser.save();

    res.status(201).json({
      message: 'Successfully created user',
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(err);
  }
};