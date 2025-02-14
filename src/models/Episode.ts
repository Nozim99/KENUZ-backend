import mongoose, { Document, Schema } from 'mongoose';


export interface IEpisode extends Document {
  title?: string;
  description?: string;
  episode_number: number;
  duration?: number;
  video_url: string;
  series: string;
  keywords?: string[];
  user: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}


const Episode: Schema<IEpisode> = new Schema({
  title: String,
  description: String,
  episode_number: {
    type: Number,
    required: true,
  },
  duration: Number,
  video_url: {
    type: String,
    required: true,
  },
  series: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  keywords: [String],
  user: String,
}, { timestamps: true });

export default mongoose.model<IEpisode>('Episode', Episode);