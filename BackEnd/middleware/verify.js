const jwt = require("jsonwebtoken");
const jwtGenerator = require("../utils/jwtGenerator");
require("dotenv").config();

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1]; //Bearer token

        jwt.verify(token, process.env.jwtSecret, (err, user) => {
            if(err){
                return res.status(401).json("Token is not valid!")
            }
            else {
                const newToken = jwtGenerator()
            }
        })  
    }
    else {
        res.status(403).json("You are not authenticated")
    }
}