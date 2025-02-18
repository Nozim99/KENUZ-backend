import { Response } from 'express';
import User, { IUser, UserRole } from '../../models/User';
import { AuthRequest } from '../../middlewares/authMiddleware';


export const change_status_user = async (req: AuthRequest, res: Response) => {
  try {
    const user_id = req.query.user_id as string;
    const is_active = req.query.is_active as string;


    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    if (req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.SUPER_ADMIN) {
      res.status(401).json({ message: 'Permission denided' });
      return;
    }

    const user: IUser | null = await User.findById(user_id);

    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    if (
      user.status === UserRole.SUPER_ADMIN
      ||
      user.status === UserRole.ADMIN && req.user.role !== UserRole.SUPER_ADMIN
    ) {
      res.status(401).json({ message: 'Permission denided' });
      return;
    }

    const updated_user = await User.findByIdAndUpdate(user._id, { active: is_active === 'true' }, { new: true });

    res.json({ message: 'User updated', user: updated_user });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(err);
  }
};