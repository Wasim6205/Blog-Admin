const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum:["user", "admin"]
    },
    avatar:{
        type:String,
    },
    favouriteBlogs:[{type: mongoose.Schema.Types.ObjectId, ref:"blog"}],
    likedBlogs:[{type: mongoose.Schema.Types.ObjectId, ref:"blog"}]
},{timestamps:true});

module.exports = mongoose.model("user",userSchema)