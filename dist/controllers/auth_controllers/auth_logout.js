"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_logout = void 0;
const auth_logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.json({ message: 'No token' });
            return;
        }
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.json({ message: 'Successfully logout' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
        console.log(error);
    }
};
exports.auth_logout = auth_logout;
