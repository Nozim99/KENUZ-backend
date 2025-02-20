"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movie_get = void 0;
const Movie_1 = __importDefault(require("../../models/Movie"));
const movie_get = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 24;
        const category = req.query.category;
        const skip = (page - 1) * limit;
        const filter = category ? { category } : {};
        const movies = await Movie_1.default
            .find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const total = await Movie_1.default.countDocuments({ category });
        res.json({
            message: 'Successfully completed',
            data: {
                movies,
                pagination: {
                    total,
                    page,
                    limit,
                },
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal error` });
    }
};
exports.movie_get = movie_get;
