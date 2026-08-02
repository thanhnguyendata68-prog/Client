// 🟢 Part 1: Database Connection & JWT Utilities
// Purpose: Generates a signed JSON Web Token (JWT) with the user's ID and role (CUSTOMER or MANAGER).
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

module.exports = generateToken;
