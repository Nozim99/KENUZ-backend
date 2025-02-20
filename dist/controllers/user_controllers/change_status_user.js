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
exports.change_status_user = void 0;
const User_1 = __importStar(require("../../models/User"));
const change_status_user = async (req, res) => {
    try {
        const user_id = req.query.user_id;
        const is_active = req.query.is_active;
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        if (req.user.role !== User_1.UserRole.ADMIN && req.user.role !== User_1.UserRole.SUPER_ADMIN) {
            res.status(401).json({ message: 'Permission denided' });
            return;
        }
        const user = await User_1.default.findById(user_id);
        if (!user) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        if (user.status === User_1.UserRole.SUPER_ADMIN
            ||
                user.status === User_1.UserRole.ADMIN && req.user.role !== User_1.UserRole.SUPER_ADMIN) {
            res.status(401).json({ message: 'Permission denided' });
            return;
        }
        const updated_user = await User_1.default.findByIdAndUpdate(user._id, { active: is_active === 'true' }, { new: true });
        res.json({ message: 'User updated', user: updated_user });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(err);
    }
};
exports.change_status_user = change_status_user;
