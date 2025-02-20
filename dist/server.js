"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const constants_1 = require("./utils/constants");
app_1.default.listen(constants_1.PORT, () => {
    console.log(`🚀 Server is running on port ${constants_1.PORT}`);
});
