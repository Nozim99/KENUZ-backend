import mongoose, {Document, Schema} from 'mongoose';
import {IMovie} from "./Movie";


export interface IEpisode extends Document {
    title?: string;
    description?: string;
    episode_number: number;
    duration?: number;
    video_url: string;
    series: string;
    keywords?: string[];
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
    keywords: [String],
}, {timestamps: true});

export default mongoose.model<IEpisode>('Episode', Episode);