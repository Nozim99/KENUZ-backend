import { Request, Response } from 'express';

import Movie from '../../models/Movie';

export const movie_search = async (req: Request, res: Response) => {
  try {
    const search: string = (req.query.search as string)?.trim() || '';

    if (!search) {
      res.json({
        message: 'Successfully completed',
        movies: [],
      });
      return;
    }

    const movies = await Movie
      .find({ title: { $regex: search, $options: 'i' } })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      message: 'Successfully completed',
      movies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal error` });
  }
};