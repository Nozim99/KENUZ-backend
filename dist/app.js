"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./utils/errorHandler"));
const dt_1 = __importDefault(require("./config/dt"));
const constants_1 = require("./utils/constants");
const movie_route_1 = __importDefault(require("./routes/movie_route"));
const episode_route_1 = __importDefault(require("./routes/episode_route"));
const sitemap_route_1 = __importDefault(require("./routes/sitemap_route"));
const user_route_1 = __importDefault(require("./routes/user_route"));
const auth_route_1 = __importDefault(require("./routes/auth_route"));
const app = (0, express_1.default)();
if (!constants_1.CLOUDINARY_CLOUD_NAME ||
    !constants_1.CLOUDINARY_API_KEY ||
    !constants_1.CLOUDINARY_API_SECRET ||
    !constants_1.MONGO_URI ||
    !constants_1.JWT_SECRET ||
    !constants_1.SUPER_ADMIN_PASSWORD ||
    !constants_1.SUPER_ADMIN_USERNAME) {
    console.log('Invalid environment variable');
    process.exit(1);
}
app.use((0, cors_1.default)({
    origin: constants_1.NODE_ENV === 'production'
        ? ['https://kenuz-admin.netlify.app', "https://kenuz.uz"]
        : ['http://localhost:5173', "http://localhost:3000"],
    credentials: true,
}));
app.use(express_1.default.json({ limit: '5mb' }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
(0, dt_1.default)();
// Routes
app.use('/api/movie', movie_route_1.default);
app.use('/api/episode', episode_route_1.default);
app.use('/api/sitemap', sitemap_route_1.default);
app.use('/api/user', user_route_1.default);
app.use('/api/auth', auth_route_1.default);
app.use(errorHandler_1.default);
exports.default = app;
