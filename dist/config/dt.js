"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
const connectDB = async () => {
    if (!constants_1.MONGO_URI) {
        console.error('MONGODB_URI environment variable is not defined.');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(constants_1.MONGO_URI);
        console.log('✅ Successful connection to MongoDB established.');
    }
    catch (error) {
        console.error('❌ An error occurred while connecting to MongoDB:', error);
        process.exit(1);
    }
    mongoose_1.default.connection.on('connected', () => {
        console.log('MongoDB connection status: Connected');
    });
    mongoose_1.default.connection.on('error', (err) => {
        console.error(`MongoDB error: ${err}`);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.log('MongoDB connection status: Disconnected');
    });
    // Node.js jarayoni tugaganda, MongoDB ulanishini yopish
    process.on('SIGINT', async () => {
        await mongoose_1.default.connection.close();
        console.log('The MongoDB connection was closed and the process was terminated.');
        process.exit(0);
    });
};
exports.default = connectDB;
