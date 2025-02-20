"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_1 = require("../config/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: 'Token required' });
            return;
        }
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            if (!decoded) {
                res.status(401).json({ message: 'Invalid token' });
                return;
            }
            const userData = decoded;
            if (!userData || !userData.userId || !userData.role) {
                res.status(401).json({ message: 'Invalid user data' });
                return;
            }
            const user = await User_1.default.findById(userData.userId);
            if (!user) {
                res
                    .status(401)
                    .cookie('token', '', {
                    httpOnly: true,
                    expires: new Date(0),
                })
                    .cookie('role', '', {
                    httpOnly: false,
                    expires: new Date(0),
                })
                    .json({ message: 'User not found' });
                return;
            }
            if (!user.active) {
                res.status(401).json({ message: 'User not active' });
                return;
            }
            req.user = userData;
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
                res
                    .status(401)
                    .cookie('token', '', {
                    httpOnly: true,
                    expires: new Date(0),
                })
                    .json({ message: 'Token expired' });
                return;
            }
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
exports.authMiddleware = authMiddleware;
