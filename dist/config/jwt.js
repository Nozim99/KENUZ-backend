"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../utils/constants");
const createToken = (userId, role) => {
    const signOptions = {
        expiresIn: '30d',
    };
    return jsonwebtoken_1.default.sign({ userId, role }, constants_1.JWT_SECRET, signOptions);
};
exports.createToken = createToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, constants_1.JWT_SECRET);
    }
    catch (error) {
        console.error('Error while validating JWT:', error);
        return null;
    }
};
exports.verifyToken = verifyToken;
