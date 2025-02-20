"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
/**
 * Global error handling middleware for Express.
 * Handles errors and sends appropriate responses.
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        stack: constants_1.NODE_ENV === 'production' ? null : err.stack
    });
};
exports.default = errorHandler;
