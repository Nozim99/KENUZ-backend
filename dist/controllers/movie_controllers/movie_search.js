"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movie_search = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const movie_search = async (req, res) => {
    try {
        const search = req.query.search?.trim() || '';
        if (!search) {
            res.json({
                message: 'Successfully completed',
                movies: [],
            });
            return;
        }
        const movies = await Movie_1.default
            .find({ title: { $regex: search, $options: 'i' } })
            .sort({ createdAt: -1 })
            .limit(20);
        res.json({
            message: 'Successfully completed',
            movies,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.movie_search = movie_search;
