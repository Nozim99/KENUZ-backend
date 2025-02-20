"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_get_all = void 0;
const User_1 = __importStar(require("../../models/User"));
const Movie_1 = __importDefault(require("../../models/Movie"));
const Episode_1 = __importDefault(require("../../models/Episode"));
const user_get_all = async (req, res) => {
    try {
        const all_users = await User_1.default.find();
        const total_episode_views = await Episode_1.default.aggregate([{
                $group: {
                    _id: '$user',
                    total_views: { $sum: '$views' },
                },
            }]);
        const total_movie_views = await Movie_1.default.aggregate([
            {
                $group: {
                    _id: '$user',
                    total_views: { $sum: '$views' },
                },
            },
        ]);
        const transformed_users = await Promise.all(all_users.map(async (user) => {
            const user_movies = await Movie_1.default.countDocuments({ user: user._id.toString() });
            const user_episodes = await Episode_1.default.countDocuments({ user: user._id.toString() });
            const episodes_views = total_episode_views.find(item => item._id === user._id.toString())?.total_views || 0;
            const movies_views = total_movie_views.find(item => item._id === user._id.toString())?.total_views || 0;
            const total_views = episodes_views + movies_views;
            const user_data = {
                name: user.name,
            };
            if (req.user?.role === User_1.UserRole.ADMIN) {
                user_data.role = user.status === User_1.UserRole.SUPER_ADMIN ? User_1.UserRole.ADMIN : user.status;
            }
            else if (req.user?.role === User_1.UserRole.SUPER_ADMIN) {
                user_data.role = user.status;
            }
            if (req.user?.role === User_1.UserRole.ADMIN || req.user?.role === User_1.UserRole.SUPER_ADMIN) {
                user_data._id = user._id;
                user_data.status = user.active;
            }
            return {
                ...user_data,
                products: user_movies + user_episodes,
                views: total_views,
            };
        }));
        res.json({
            message: `Successfully get all episodes views`,
            data: transformed_users,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};
exports.user_get_all = user_get_all;
