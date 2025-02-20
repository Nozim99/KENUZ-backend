import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from './utils/errorHandler';
import connectDB from './config/dt';
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
  JWT_SECRET,
  MONGO_URI, NODE_ENV, SUPER_ADMIN_PASSWORD, SUPER_ADMIN_USERNAME,
} from './utils/constants';
import movie_routes from './routes/movie_route';
import episode_routes from './routes/episode_route';
import sitemap_routes from './routes/sitemap_route';
import user_routes from './routes/user_route';
import auth_routes from './routes/auth_route';


const app: Application = express();


if (
  !CLOUDINARY_CLOUD_NAME ||
  !CLOUDINARY_API_KEY ||
  !CLOUDINARY_API_SECRET ||
  !MONGO_URI ||
  !JWT_SECRET ||
  !SUPER_ADMIN_PASSWORD ||
  !SUPER_ADMIN_USERNAME
) {
  console.log('Invalid environment variable');
  process.exit(1);
}

app.use(cors({
  origin: NODE_ENV === 'production'
    ? ['https://kenuz-admin.netlify.app', "https://kenuz.uz"]
    : ['http://localhost:5173', "http://localhost:3000"],
  credentials: true,
}));

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

connectDB();

// Routes
app.use('/api/movie', movie_routes);
app.use('/api/episode', episode_routes);
app.use('/api/sitemap', sitemap_routes);
app.use('/api/user', user_routes);
app.use('/api/auth', auth_routes);

app.use(errorHandler);

export default app;