const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
require("dotenv").config();
let userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date_created:{
        type:Date,
        default:Date.now 
    }
});
exports.UserModel = mongoose.model("users", userSchema);
exports.createToken = (_userId) => {
    let token = jwt.sign({ _id: _userId }, process.env.JWT_SECRET, { expiresIn: "60mins" });
    return token;
};
exports.validateUser = (_reqBody) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(99).required(),
        email: Joi.string().email().required().min(2).max(99),
        password: Joi.string().min(6).max(99).required(),
    });
    return schema.validate(_reqBody);
};
exports.validateLogin = (_reqBody) => {
    const schema = Joi.object({
        email: Joi.string().email().required().min(2).max(99),
        password: Joi.string().min(6).max(99).required(),
    });
    return schema.validate(_reqBody);
}