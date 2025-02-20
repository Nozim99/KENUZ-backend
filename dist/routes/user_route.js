"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const user_controllers_1 = require("../controllers/user_controllers");
const router = express_1.default.Router();
router.get('/get-all', authMiddleware_1.authMiddleware, user_controllers_1.user_get_all);
router.post('', authMiddleware_1.authMiddleware, user_controllers_1.user_create);
router.post('/change-status', authMiddleware_1.authMiddleware, user_controllers_1.change_status_user);
exports.default = router;
