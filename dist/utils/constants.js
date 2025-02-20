"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SUPER_ADMIN_PASSWORD = exports.SUPER_ADMIN_USERNAME = exports.JWT_SECRET = exports.PORT = exports.NODE_ENV = exports.MONGO_URI = exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_CLOUD_NAME = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
exports.MONGO_URI = process.env.MONGO_URI || '';
exports.NODE_ENV = process.env.NODE_ENV || 'development';
exports.PORT = process.env.PORT || 3758;
exports.JWT_SECRET = process.env.JWT_SECRET || '';
exports.SUPER_ADMIN_USERNAME = process.env.SUPER_ADMIN_USERNAME || '';
exports.SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || '';
