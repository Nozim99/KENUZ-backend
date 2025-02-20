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
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_create = void 0;
const User_1 = __importStar(require("../../models/User"));
const hashPassword_1 = require("../../utils/hashPassword");
const user_create = async (req, res) => {
    try {
        const { first_name, username, password, status, } = req.body;
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        if ((status === User_1.UserRole.ADMIN && req.user.role !== User_1.UserRole.SUPER_ADMIN)
            ||
                (req.user.role !== User_1.UserRole.ADMIN && req.user.role !== User_1.UserRole.SUPER_ADMIN)) {
            res.status(401).json({ message: 'No permission to create' });
            return;
        }
        if (!first_name || !username || !password) {
            res.status(401).json({ message: 'Invalid data' });
            return;
        }
        const hash_password = await (0, hashPassword_1.hashPassword)(password);
        const newUser = new User_1.default({
            name: first_name,
            password: hash_password,
            username,
            status,
        });
        await newUser.save();
        res.status(201).json({
            message: 'Successfully created user',
            user: newUser,
        });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(err);
    }
};
exports.user_create = user_create;
