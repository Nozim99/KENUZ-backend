import { Request, Response } from 'express';
import Movie, { IMovie } from '../../models/Movie';
import Episode, { IEpisode } from '../../models/Episode';

interface IData {
  series_title: string;
  episode_number: number;
  video_url: string;
  title?: string;
  description?: string;
  duration?: number;
  keywords?: string[];
}


export const episode_create = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      series_title,
      description,
      keywords,
      video_url,
      episode_number,
      duration,
    }: IData = req.body;


    if (!video_url || !episode_number || !series_title) {
      res.status(400).json({ message: 'invalid data' });
      return;
    }

    const same_episode = await Episode.findOne({ series: series_title, episode_number: episode_number });

    if (same_episode) {
      res.status(400).json({ message: 'This Episode is available' });
      return;
    }

    const series = await Movie.findOne({ title: series_title });

    if (!series || series.type !== 'series') {
      res.status(400).json({ message: 'Serial not available' });
      return;
    }

    const new_episode: IEpisode = new Episode({
      title,
      series: series_title,
      description,
      keywords,
      video_url,
      episode_number,
      duration,
    });

    await new_episode.save();

    res.status(201).json({
      message: 'Successfully uploaded',
      episode: new_episode,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal error` });
  }
};