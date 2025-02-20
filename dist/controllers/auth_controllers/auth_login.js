"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importStar(require("../../models/User"));
const jwt_1 = require("../../config/jwt");
const constants_1 = require("../../utils/constants");
const cookie_options = {
    httpOnly: true,
    secure: constants_1.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 4 * 7 * 24 * 60 * 60 * 1000, // 30 day
};
const auth_login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: 'Username and password is required' });
            return;
        }
        if (username === constants_1.SUPER_ADMIN_USERNAME && password === constants_1.SUPER_ADMIN_PASSWORD) {
            const admin = await User_1.default.findOne({ username: 'super_admin' });
            if (!admin) {
                const newSuperAdmin = new User_1.default({
                    name: 'MEZES',
                    username: 'super_admin',
                    password: '123',
                    status: User_1.UserRole.SUPER_ADMIN,
                });
                await newSuperAdmin.save();
                const token = (0, jwt_1.createToken)(newSuperAdmin._id.toString(), User_1.UserRole.SUPER_ADMIN);
                res
                    .cookie('token', token, cookie_options)
                    .cookie('role', User_1.UserRole.SUPER_ADMIN, { ...cookie_options, httpOnly: false })
                    .json({ message: 'Successfully logged', token, role: User_1.UserRole.SUPER_ADMIN });
                return;
            }
            const token = (0, jwt_1.createToken)(admin._id.toString(), User_1.UserRole.SUPER_ADMIN);
            res
                .cookie('token', token, cookie_options)
                .cookie('role', User_1.UserRole.SUPER_ADMIN, { ...cookie_options, httpOnly: false })
                .json({ message: 'Successfully logged', token, role: User_1.UserRole.SUPER_ADMIN });
            return;
        }
        const user = await User_1.default.findOne({ username });
        if (!user) {
            res.status(400).json({ message: 'username or password is incorrect' });
            return;
        }
        const is_match = await bcrypt_1.default.compare(password, user.password);
        if (!is_match) {
            res.status(400).json({ message: 'username or password is incorrect' });
            return;
        }
        const token = (0, jwt_1.createToken)(user._id.toString(), user.status);
        res
            .cookie('token', token, cookie_options)
            .cookie('role', user.status, { ...cookie_options, httpOnly: false })
            .json({ message: 'Authenticated successfully', token, role: user.status });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
    }
};
exports.auth_login = auth_login;
