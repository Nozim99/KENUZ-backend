import dotenv from 'dotenv';


dotenv.config();


export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
export const MONGO_URI = process.env.MONGO_URI || '';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3758;
export const JWT_SECRET = process.env.JWT_SECRET || ''
export const SUPER_ADMIN_USERNAME = process.env.SUPER_ADMIN_USERNAME || '';
export const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || '';

