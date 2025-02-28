import mongoose, { Document, Schema } from 'mongoose';


export interface IMovie extends Document {
  title: string;
  description: string;
  keywords?: string[];
  category: 'film' | 'anime' | 'cartoon';
  type: 'movie' | 'series';
  // episodes?: mongoose.Types.ObjectId[];
  image: {
    url: string;
    cloudId: string;
  },
  video_url?: string;
  country?: string,
  language?: string,
  year?: number,
  genre?: [string],
  age_limit?: number,
  user: string,
  dubbing_artist?: string,
  views: number,
  createdAt: Date;
  updatedAt: Date;
  _id: Schema.Types.ObjectId;
}


const MovieSchema: Schema<IMovie> = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: [String],
  category: {
    type: String,
    required: true,
    enum: ['film', 'anime', 'cartoon'],
  },
  type: {
    type: String,
    enum: ['movie', 'series'],
    required: true,
  },
  user: String,
  views: {
    type: Number,
    default: 0,
  },
  dubbing_artist: String,
  video_url: String,
  country: {
    type: String,
    default: 'Yaponiya',
  },
  language: {
    type: String,
    default: 'O\'zbek tilida',
  },
  year: Number,
  genre: [String],
  age_limit: Number,
  image: {
    url: {
      type: String,
      required: true,
    },
    cloudId: {
      type: String,
      required: true,
    },
  },
}, { timestamps: true });

export default mongoose.model<IMovie>('Movie', MovieSchema);