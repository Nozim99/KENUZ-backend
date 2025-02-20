"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const episode_controllers_1 = require("../controllers/episode_controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get('/:title/:episode_number', episode_controllers_1.episode_get);
router.post('/create', authMiddleware_1.authMiddleware, episode_controllers_1.episode_create);
exports.default = router;
