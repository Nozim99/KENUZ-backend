"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemap_get = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const Episode_1 = __importDefault(require("../../models/Episode"));
const sitemap_get = async (req, res) => {
    try {
        const movies = await Movie_1.default.find().select('title -_id');
        const episodes = await Episode_1.default.find().select('title series episode_number -_id');
        const movie_titles = movies.map(movie => encodeURI(movie.title));
        const episode_titles = episodes.map(episode => {
            if (episode.title)
                return encodeURI(episode.title);
            return encodeURI(`${episode.series} ${episode.episode_number}-qism`);
        });
        res.json({
            message: 'Successfully completed',
            data: [...movie_titles, ...episode_titles],
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.sitemap_get = sitemap_get;
