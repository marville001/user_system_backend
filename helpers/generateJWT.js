const jwt = require('jsonwebtoken');
const config = require('../config/config.json')

module.exports = (email, id) => {
    return jwt.sign({
        email, id
    }, config.secret_key, { expiresIn: 32 });
}