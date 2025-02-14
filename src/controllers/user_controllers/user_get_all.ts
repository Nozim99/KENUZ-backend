import { Response } from 'express';
import User, { IUser, UserRole } from '../../models/User';
import Movie from '../../models/Movie';
import Episode from '../../models/Episode';
import mongoose from 'mongoose';
import { AuthRequest } from '../../middlewares/authMiddleware';


interface UserViews {
  _id: string;
  total_views: number;
}


export const user_get_all = async (req: AuthRequest, res: Response) => {
  try {
    const all_users: IUser[] = await User.find();

    const total_episode_views: UserViews[] = await Episode.aggregate([{
      $group: {
        _id: '$user',
        total_views: { $sum: '$views' },
      },
    }]);

    const total_movie_views: UserViews[] = await Movie.aggregate([
      {
        $group: {
          _id: '$user',
          total_views: { $sum: '$views' },
        },
      },
    ]);


    const transformed_users = await Promise.all(all_users.map(async (user: IUser) => {
      const user_movies = await Movie.countDocuments({ user: user._id.toString() });
      const user_episodes = await Episode.countDocuments({ user: user._id.toString() });

      const episodes_views = total_episode_views.find(item => item._id === user._id.toString())?.total_views || 0;
      const movies_views = total_movie_views.find(item => item._id === user._id.toString())?.total_views || 0;
      const total_views = episodes_views + movies_views;

      const user_data: {
        name: string;
        _id?: mongoose.Types.ObjectId;
        role?: UserRole;
        status?: boolean;
      } = {
        name: user.name,
      };

      if (req.user?.role === UserRole.ADMIN) {
        user_data.role = user.status === UserRole.SUPER_ADMIN ? UserRole.ADMIN : user.status;
      } else if (req.user?.role === UserRole.SUPER_ADMIN) {
        user_data.role = user.status;
      }
      if (req.user?.role === UserRole.ADMIN || req.user?.role === UserRole.SUPER_ADMIN) {
        user_data._id = user._id;
        user_data.status = user.active;
      }

      return {
        ...user_data,
        products: user_movies + user_episodes,
        views: total_views,
      };
    }));


    res.json({
      message: `Successfully get all episodes views`,
      data: transformed_users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
    console.log(error);
  }
};