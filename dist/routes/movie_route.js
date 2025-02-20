"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multerConfig_1 = __importDefault(require("../utils/multerConfig"));
const movie_controllers_1 = require("../controllers/movie_controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const movie_search_1 = require("../controllers/movie_controllers/movie_search");
const router = express_1.default.Router();
router.get('/', movie_controllers_1.movie_get);
router.get('/by_title/:title', movie_controllers_1.movie_get_by_title);
router.get('/search', movie_search_1.movie_search);
router.post('/create', authMiddleware_1.authMiddleware, multerConfig_1.default.single('image'), movie_controllers_1.movie_create);
exports.default = router;
