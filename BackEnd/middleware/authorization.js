const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = function(req, res, next) {
  // Get token from header
  var bearerHeader = req.headers["authorization"];

  if(typeof(bearerHeader) !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken=bearer[1];
    jwt.verify(bearerToken, process.env.jwtSecret, (err, result)=>{
      if(err){res.status(401).json({ msg: "Token is not valid" });}
      else{next()}
    })
  }else{
    res.status(403).end();}

};
