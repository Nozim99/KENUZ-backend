"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload_image = void 0;
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const upload_image = async (filePath) => {
    try {
        const result = await cloudinary_1.default.uploader.upload(filePath, {
            folder: 'Movie',
        });
        fs_1.default.unlinkSync(filePath);
        return {
            url: result.secure_url,
            cloudId: result.public_id,
        };
    }
    catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('There was an error loading the image!');
    }
};
exports.upload_image = upload_image;
