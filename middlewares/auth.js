const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
        return res.status(401).json({ msg: "You must send token" });
    }
    try {
        let verified = jwt.verify(token, process.env.JWT_SECRET);
        req.tokenData = verified;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ msg: "Invalid token" });
    }
}