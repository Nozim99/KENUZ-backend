"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth_controllers");
const auth_logout_1 = require("../controllers/auth_controllers/auth_logout");
const router = express_1.default.Router();
router.post('/login', auth_controllers_1.auth_login);
router.post('/logout', auth_logout_1.auth_logout);
exports.default = router;
