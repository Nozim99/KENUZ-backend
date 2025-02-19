import { Request, Response } from 'express';

import Movie, { IMovie } from '../../models/Movie';
import Episode from '../../models/Episode';

export const movie_get_by_title = async (req: Request, res: Response) => {
  try {
    const title = req.params.title as string;
    const do_inc_views = req.query.inc_views === 'true';

    if (!title) {
      res.status(400).json({ message: 'Title parameter is required' });
      return;
    }

    const movie: IMovie | null = await Movie.findOne({ title });

    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    let total_episodes: number | undefined;

    if (movie.type === 'series') {
      total_episodes = await Episode.countDocuments({ series: movie.title });
    }

    res.json({
      message: 'Successfully completed',
      movie,
      total_episodes,
    });

    if (do_inc_views) await Movie.findByIdAndUpdate(movie._id, { $inc: { views: 1 } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal error` });
  }
};