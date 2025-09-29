const express = require("express");
const { auth } = require("../middlewares/auth");
const {validateBook ,bookModel} = require("../models/bookModel")
const router = express.Router();

router.get("/", async (req, res) => {

  let perPage = Math.min(req.query.perPage, 20) || 4;
  let page = req.query.page || 1;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;

  try {
    let data = await bookModel
      .find({})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ [sort]: reverse })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }

})
router.post("/", auth, async (req, res) => {
  let validateBody = validateBook(req.body);
  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details)
  }
  try {
    let book = new bookModel(req.body);
   
    book.user_id = req.tokenData._id;
    await book.save();
    res.status(201).json(book)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.put("/:idEdit", async (req, res) => {
  let validateBody = validateBook(req.body);
  if (validateBody.error) {
    return res.status(400).json(validateBody.error.details)
  }
  try {
    let idEdit = req.params.idEdit
    let data = await bookModel.updateOne({ _id: idEdit }, req.body)
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.delete("/:idDel", auth, async (req, res) => {
  try {
    let idDel = req.params.idDel
 
    let data = await bookModel.deleteOne({ _id: idDel, user_id: req.tokenData._id })
    res.json(data);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

module.exports = router;