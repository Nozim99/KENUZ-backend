import { Request, Response } from 'express';

import Episode, { IEpisode } from '../../models/Episode';
import Movie from '../../models/Movie';

export const episode_get = async (req: Request, res: Response) => {
  try {
    const title = req.params.title as string;
    const episode_number: number = +req.params.episode_number;

    if (!episode_number) {
      res.status(400).send({ message: 'Episode Number parameter is required' });
      return;
    }

    if (!title) {
      res.status(400).json({ message: 'Title parameter is required' });
      return;
    }

    const episode: IEpisode | null = await Episode.findOne({ series: title, episode_number: episode_number });
    const series = await Movie.findOne({ title });

    const total_episode = await Episode.countDocuments({ series: title });

    if (!series) {
      res.status(400).send({ message: 'Series not found' });
      return;
    }

    if (!episode) {
      res.status(400).send({ message: 'Episode not found' });
      return;
    }


    res.json({
      message: 'Successfully completed',
      data: {
        episode,
        series,
        total_episode,
      },
    });

    await Episode.findByIdAndUpdate(episode._id, { $inc: { views: 1 } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal error` });
  }
};