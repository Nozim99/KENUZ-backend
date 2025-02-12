import { Request, Response } from 'express';

import Movie from '../../models/Movie';
import Episode from '../../models/Episode';


export const sitemap_get = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().select('title -_id');
    const episodes = await Episode.find().select('title series episode_number -_id');

    const movie_titles = movies.map(movie => encodeURI(movie.title));
    const episode_titles = episodes.map(episode => {
      if (episode.title) return encodeURI(episode.title);
      return encodeURI(`${episode.series} ${episode.episode_number}-qism`);
    });

    res.json({
      message: 'Successfully completed',
      data: [...movie_titles, ...episode_titles],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal error` });
  }
};