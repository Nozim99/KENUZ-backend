"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movie_get_by_title = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const Episode_1 = __importDefault(require("../../models/Episode"));
const movie_get_by_title = async (req, res) => {
    try {
        const title = req.params.title;
        const do_inc_views = req.query.inc_views === 'true';
        if (!title) {
            res.status(400).json({ message: 'Title parameter is required' });
            return;
        }
        const movie = await Movie_1.default.findOne({ title });
        if (!movie) {
            res.status(404).json({ message: 'Movie not found' });
            return;
        }
        let total_episodes;
        if (movie.type === 'series') {
            total_episodes = await Episode_1.default.countDocuments({ series: movie.title });
        }
        res.json({
            message: 'Successfully completed',
            movie,
            total_episodes,
        });
        if (do_inc_views)
            await Movie_1.default.findByIdAndUpdate(movie._id, { $inc: { views: 1 } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.movie_get_by_title = movie_get_by_title;
