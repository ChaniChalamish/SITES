require("dotenv").config()


exports.config = {
    mongoUrl : process.env.MONGO_URL,
    jwtSecret:process.env.JWT_SECRET,
    port :process.env.PORT
}