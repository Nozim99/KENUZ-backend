"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movie_create = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const cloudinary_services_1 = require("../../services/cloudinary_services");
const movie_create = async (req, res) => {
    try {
        const image = req.file;
        const { title, description, keywords, category, type, video_url, country, language, year, genre, age_limit, } = req.body;
        if (!title || !description || !category || !image || !['movie', 'series'].includes(type)) {
            res.status(400).json({ message: 'invalid data' });
            return;
        }
        const same_movie = await Movie_1.default.findOne({ title });
        if (same_movie) {
            res.status(400).json({ message: 'Bu title takrorlangan' });
            return;
        }
        const image_result = await (0, cloudinary_services_1.upload_image)(image.path);
        const new_movie = new Movie_1.default({
            user: req.user?.userId,
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
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.movie_create = movie_create;
