const jwt = require('jsonwebtoken');
const User = require('../Models/User');
require('dotenv').config()

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                message: "Auth error Token not provided"
            })
        }
        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({
                message: "Auth Error : Invalid Token"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
module.exports = authenticateToken;