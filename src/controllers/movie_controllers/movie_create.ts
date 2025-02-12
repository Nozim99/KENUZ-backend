import { Request, Response } from 'express';
import Movie, { IMovie } from '../../models/Movie';
import { upload_image } from '../../services/cloudinary_services';

interface IData {
  title: string;
  description: string;
  keywords?: string[];
  category: 'film' | 'anime' | 'cartoon';
  type: 'movie' | 'series';
  video_url?: string;
  country?: string,
  language?: string,
  year?: number,
  genre?: [string],
  age_limit?: number,
}


export const movie_create = async (req: Request, res: Response): Promise<void> => {
  try {
    const image = req.file;

    const {
      title,
      description,
      keywords,
      category,
      type,
      video_url,
      country,
      language,
      year,
      genre,
      age_limit,
    }: IData = req.body;


    if (!title || !description || !category || !image || !['movie', 'series'].includes(type)) {
      res.status(400).json({ message: 'invalid data' });
      return;
    }

    const same_movie = await Movie.findOne({ title });
    if (same_movie) {
      res.status(400).json({ message: 'Bu title takrorlangan' });
      return;
    }

    const image_result = await upload_image(image.path);

    const new_movie: IMovie = new Movie({
      title,
      description,
      keywords,
      category,
      type,
      video_url,
      country,
      language,
      year,
      genre,
      age_limit,
      image: image_result,
    });

    await new_movie.save();

    res.status(201).json({
      message: 'Successfully uploaded',
      movie: new_movie,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Internal error` });
  }
};