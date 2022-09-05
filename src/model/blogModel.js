const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const date=require("moment")
const blogSchema = new mongoose.Schema(
{ title: {
    type:string,
    required:true
},
 body: {
    type:string,
    required:true}, 
 authorId: {
    type:ObjectId,
    ref:'author',
    required:true,
 }, 
 tags: {
    type:String,
    enum:["Book", "Friends", "Self help"]
 }, 
 category: {
    type:string,
    required:true,
    enum: ["technology", "entertainment", "life style", "food", "fashion"]
},
  subcategory: {type: String,
    enum:[technology-["web development", "mobile development", "AI", "ML"],
    entertainment-["game","songs","dance"],life_style-["yoga","gym","travels","modeling"],
    food-["panir","italli","dosa","samosa"],
    fashion-["indian","western"]] }, 

    deletedAt: {
        type:date
    }, 
    isPublished: {
        type:Boolean,
        default:false
    },
    isDeleted: {
        type:Boolean, 
        default: false
    }, 
    publishedAt: {
        type:date
    }, 
    },{timestamps:true})

  module.exports=mongoose.model("blog",blogSchema)