const express = require("express");
const router = express.Router();
const { validateSite, SiteModel } = require("../models/siteModel");



router.get("/", async (req, res) => {
    let perPage = Math.min(req.query.perPage , 20) || 6;
    let page = req.query.page || 1;
    let sort = req.query.sort || "_id";
    let reverse = req.query.reverse == "yes" ? -1 : 1;
    try {
        let data = await SiteModel.find({}).limit(perPage).skip((page - 1) * perPage).sort({ [sort]: reverse });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err })
    }
});

router.post("/", async (req, res) => {
    let validBody = validateSite(req.body);
    if (validBody.error) {
        return res.status(400).json(validBody.error.details);
    }
    try {

        let site = new SiteModel(req.body);
        await site.save();
        res.status(201).json(site);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "There was an error, try again later", error })

    }
});
router.delete("/:idDel", async (req, res) => {
    try {
        let idDel = req.params.idDel;
        let data = await SiteModel.deleteOne({ _id: idDel });
        res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err })
    }
});
router.get("/:idEdit", async (req, res) => {
    try {
        let idEdit = req.params.idEdit;
        let data = await SiteModel.find({ _id: idEdit });
        res.status(201).json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err })
    }
});

router.put("/:idEdit", async (req, res) => {
    let validBody = validateSite(req.body);
    console.log(req.body);
    if (validBody.error) {
        console.log(validBody.error.details);
        return res.status(400).json(validBody.error.details);
    }
    try {
        let idEdit = req.params.idEdit;
        let data = await SiteModel.findOneAndUpdate({ _id: idEdit }, req.body, { new: true });
        console.log(data);
        res.status(201).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "There was an error, try again later", err })
    }
});
module.exports = router;