const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default:0
    },
    category:{},
    favouriteBlogByUsers:[{type: mongoose.Schema.Types.ObjectId, ref:"user"}],
    likedBlogByUsers:[{type: mongoose.Schema.Types.ObjectId, ref:"user"}]
},{timestamps:true});

module.exports = mongoose.model("blog",blogSchema)