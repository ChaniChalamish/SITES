const {auth} = require("../middlewares/auth");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const  jwt  = require("jsonwebtoken");
const { UserModel,createToken,validateUser,validateLogin } = require("../models/userModel");
    
router.post("/", async (req, res) => {
    try {
        let validateBody = validateUser(req.body);
        if (validateBody.error) {
            console.log(validateBody.error.details);
            return res.status(400).json(validateBody.error.details);
        }
        let user = new UserModel(req.body);
        console.log(user);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        user.password = "******"
        res.status(201).json(user);
    } catch (err) { 
        if (err.code == 11000) {
            return res.status(500).json({ msg: "Email already in system, try to log in", code: 11000 })
        }
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err });
    }
})
router.post("/login", async (req, res) => {
    let validBody = validateLogin(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }   
    try {
        let user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ msg: "User or password not match" });
        }
        let passOk = await bcrypt.compare(req.body.password, user.password);
        if (!passOk) {
            return res.status(401).json({ msg: "User or password not match" });
        }
        let token = createToken(user._id);
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err });
    }
});


router.get("/myEmail", auth, async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { email: 1 });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err });
    }
});

router.get("/myInfo", auth, async (req, res) => {
    try {
        let user = await UserModel.findOne({ _id: req.tokenData._id }, { password: 0 });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err });
    }
});

module.exports = router;


        

