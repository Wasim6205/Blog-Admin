const Blog = require("../models/blog.model.js")
const User = require("../models/user.model.js")
const jwt = require('jsonwebtoken')

// fetch all blogs
exports.fetchAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find().sort({createdAt:-1});
        res.status(200).json({success:true,blogs})
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal sever error"})
    }
}

// fetch recent blogs
exports.fetchRecentBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find().sort({createdAt:-1}).limit(4);
        res.status(200).json({success:true,blogs})
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal sever error"})
    }
}

// fetch blog by id
exports.getBlodById = async (req,res) => {
    try {
        const token = req.cookies.blogsapp;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
        
        const {id} = req.params;
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(400).json({error:"No blog found"})
        }
        // favouriteBlogByUsers
        let favourite = false;
        if(user && blog.favouriteBlogByUsers.includes(user._id)){
            favourite = true
        }
        
        res.status(200).json({success:true, blog, favourite})
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal sever error"})
    }
}

// add blogs to favourite
exports.addBlogsToFavourite = async (req,res) => {
    try {
        const {user} = req;
        const {id} = req.params;
        const existingUser = await User.findById(user._id)
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(400).json({error:"No blog found"})
        }
        blog.favouriteBlogByUsers.push(user._id);
        existingUser.favouriteBlogs.push(id);
        await blog.save();
        await existingUser.save();
        res.status(200).json({success:true,error:"Blog added to favourites"});
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal sever error"});
    }
}

// remove blogs from favourite
exports.removeBlogsFromFavourite = async (req,res) => {
    try {
        const {user} = req;
        const {id} = req.params;
        const existingUser = await User.findById(user._id)
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(400).json({error:"No blog found"})
        }

        const userFavouriteIndex = existingUser.favouriteBlogs.indexOf(id);
        if(userFavouriteIndex !== -1){
            existingUser.favouriteBlogs.splice(userFavouriteIndex, 1);
        }else {
            return res.status(400).json({error:"Blog is not in user's favourites"})
        }

        const blogFavouriteIndex = blog.favouriteBlogByUsers.indexOf(user._id);
        if(blogFavouriteIndex !== -1){
            blog.favouriteBlogByUsers.splice(blogFavouriteIndex,1);
        }
        
        await blog.save();
        await existingUser.save();
        res.status(200).json({success:true,error:"Blog removed from favourites"});
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal sever error"});
    }
}

