// 🛡️ Part 2: Middlewares (Auth, RBAC & Errors)
// Purpose:
// protect: Reads the Authorization: Bearer <token> header, verifies the token, and attaches the logged-in student/manager (req.user) to the request.
// authorize: Checks if req.user.role has permission (e.g. authorize('MANAGER')).

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            if (!req.user.isActive) {
                return res.status(403).json({ success: false, message: 'User account is deactivated' });
            }

            return next();
        } catch (error) {
            console.error('Auth Token Error:', error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role '${req.user.role}' is not authorized to access this resource`
            });
        }

        next();
    };
};

module.exports = { protect, authorize };
