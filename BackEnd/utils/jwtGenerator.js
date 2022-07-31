const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id){
    const payload = {
        user: {
            id: user_id,
        }
    };
    return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "5d" }) //expires = harder to hack
}

module.exports = jwtGenerator;
