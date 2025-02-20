"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.episode_create = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const Episode_1 = __importDefault(require("../../models/Episode"));
const episode_create = async (req, res) => {
    try {
        const { title, series_title, description, keywords, video_url, episode_number, duration, } = req.body;
        if (!video_url || !episode_number || !series_title) {
            res.status(400).json({ message: 'invalid data' });
            return;
        }
        const same_episode = await Episode_1.default.findOne({ series: series_title, episode_number: episode_number });
        if (same_episode) {
            res.status(400).json({ message: 'This Episode is available' });
            return;
        }
        const series = await Movie_1.default.findOne({ title: series_title });
        if (!series || series.type !== 'series') {
            res.status(400).json({ message: 'Serial not available' });
            return;
        }
        const new_episode = new Episode_1.default({
            user: req.user?.userId,
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.episode_create = episode_create;
