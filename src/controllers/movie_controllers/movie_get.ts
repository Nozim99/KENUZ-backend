import { Request, Response } from 'express';

import Movie from '../../models/Movie';

export const movie_get = async (req: Request, res: Response) => {
  try {
    const page: number = parseInt(req.query.page as string, 10) || 1;
    const limit: number = parseInt(req.query.limit as string, 10) || 24;
    const category: string = req.query.category as string;

    const skip: number = (page - 1) * limit;

    const filter = category ? { category } : {};

    const movies = await Movie
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Movie.countDocuments({category});

    res.json({
      message: 'Successfully completed',
      data: {
        movies,
        pagination: {
          total,
          page,
          limit,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal error` });
  }
};