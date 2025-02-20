"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sitemap_controllers_1 = require("../controllers/sitemap_controllers");
const router = express_1.default.Router();
router.get('/', sitemap_controllers_1.sitemap_get);
exports.default = router;
