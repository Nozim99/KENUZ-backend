import { Response } from 'express';
import Movie, { IMovie } from '../../models/Movie';
import { AuthRequest } from '../../middlewares/authMiddleware';

interface IData {
  title: string;
  video_url: string;
}


export const movie_edit_video_url = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      title,
      video_url,
    }: IData = req.body;


    if (!title || !video_url) {
      res.status(400).json({ message: 'invalid data' });
      return;
    }

    const same_movie = await Movie.findOne({ title });
    if (same_movie) {
      res.status(400).json({ message: 'Bu title takrorlangan' });
      return;
    }

    const movie: IMovie | null = await Movie.findOne({ title });

    if (!movie) {
      res.status(400).json({ message: 'Movie not found' });
      return;
    }

    await Movie.findOneAndUpdate(movie._id, { video_url });

    res.status(201).json({
      message: 'Successfully edited',
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal error` });
  }
};