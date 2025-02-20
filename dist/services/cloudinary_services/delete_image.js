"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_image = void 0;
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const delete_image = async (publicId) => {
    try {
        await cloudinary_1.default.uploader.destroy(publicId);
    }
    catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('There was an error deleting the image!');
    }
};
exports.delete_image = delete_image;
