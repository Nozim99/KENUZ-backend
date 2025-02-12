import express, { Application } from 'express';
import path from 'path';
import cors from 'cors';
import movie_routes from './routes/movie_route';
import episode_routes from './routes/episode_route';
import sitemap_routes from './routes/sitemap_route';
import errorHandler from './utils/errorHandler';
import connectDB from './config/dt';


const app: Application = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

connectDB();

// Routes
app.use('/api/movie', movie_routes);
app.use('/api/episode', episode_routes);
app.use('/api/sitemap', sitemap_routes);

app.use(errorHandler);

export default app;