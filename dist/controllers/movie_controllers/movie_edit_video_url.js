"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movie_edit_video_url = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const movie_edit_video_url = async (req, res) => {
    try {
        const { title, video_url, } = req.body;
        if (!title || !video_url) {
            res.status(400).json({ message: 'invalid data' });
            return;
        }
        const same_movie = await Movie_1.default.findOne({ title });
        if (same_movie) {
            res.status(400).json({ message: 'Bu title takrorlangan' });
            return;
        }
        const movie = await Movie_1.default.findOne({ title });
        if (!movie) {
            res.status(400).json({ message: 'Movie not found' });
            return;
        }
        await Movie_1.default.findOneAndUpdate(movie._id, { video_url });
        res.status(201).json({
            message: 'Successfully edited',
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.movie_edit_video_url = movie_edit_video_url;
