const mongoose = require("mongoose");
const Joi = require("joi");

let bookSchema = new mongoose.Schema({
    name:String,
    author:String,
    image:String,
    pages:Number,
    date_created:{
        type:Date,
        default:Date.now
    },
    user_id:String
})

exports.bookModel = mongoose.model("books",bookSchema)

exports.validateBook  = (_reqBody) => {
    let schemaJoi = Joi.object({
        name:Joi.string().min(2).max(99).required(),
        author:Joi.string().min(2).max(99).required(),
        image:Joi.string().min(10).max(3000000).allow(null,""),
        pages:Joi.number().min(2).max(2000).required()
      })
      return schemaJoi.validate(_reqBody)
    }