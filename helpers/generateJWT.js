const jwt = require('jsonwebtoken');

module.exports = (email, id) => {
    return jwt.sign({
        email, id
    }, process.env.SECRET_KEY, { expiresIn: "24h" });
}