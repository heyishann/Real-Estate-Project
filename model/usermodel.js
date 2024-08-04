const uniqueValidator = require('mongoose-unique-validator');
const mongoose =require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const blogSchema = new Schema({
  email: {type: String , required:true},
  username: {type: String , required:true, unique:true},
  password: {type: String , required:true},
  avatar: String,
  createdAt: { type: Date, default: Date.now ,required:true }
});

blogSchema.plugin(uniqueValidator)


module.exports = mongoose.model("user",blogSchema)