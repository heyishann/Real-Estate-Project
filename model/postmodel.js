const mongoose =require("mongoose");
// const postdetailmodel = require("./postdetailmodel.js");
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {type: String , required:true},
    price: {type: Number , required:true},
    images: Array,
    city:String,
    address: String,
    bedroom: Number,
    bathroom: Number,
    latitude: Number,
    longitude: Number,
    desc: String,
    utility: {type:String, required:false},
    pet: {type:String, required:false},
    income: {type:String, required:false},
    size: {type:Number, required:false},
    school: {type:Number, required:false},
    bus: {type:Number, required:false},
    restaurant: {type:Number, required:false},
    type : {type:String , enum : ['buy','rent']},
    property :{type:String ,enum: ['apartment','house','condo','land']},
    createdAt: { type: Date, default: Date.now ,required:true },
    userID : {type:Schema.Types.ObjectId,
                ref:'users'}
  });

  module.exports = mongoose.model("post",postSchema)