"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.episode_get = void 0;
const Episode_1 = __importDefault(require("../../models/Episode"));
const Movie_1 = __importDefault(require("../../models/Movie"));
const episode_get = async (req, res) => {
    try {
        const title = req.params.title;
        const episode_number = +req.params.episode_number;
        const do_inc_views = req.query.inc_views === 'true';
        if (!episode_number) {
            res.status(400).send({ message: 'Episode Number parameter is required' });
            return;
        }
        if (!title) {
            res.status(400).json({ message: 'Title parameter is required' });
            return;
        }
        const episode = await Episode_1.default.findOne({ series: title, episode_number: episode_number });
        const series = await Movie_1.default.findOne({ title });
        const total_episode = await Episode_1.default.countDocuments({ series: title });
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
        if (do_inc_views)
            await Episode_1.default.findByIdAndUpdate(episode._id, { $inc: { views: 1 } });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.episode_get = episode_get;
