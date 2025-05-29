const User = require("../models/user.model.js")
const Category = require("../models/category.model.js")
const Blog = require("../models/blog.model.js")

exports.addCategory = async (req,res) => {
    try {
        const {title} = req.body;
        const checkCat = await Category.findOne({title});

        if(checkCat){
            return res.status(400).json({error:"Category already exists"})
        }

        const newCat = new Category({title});
        await newCat.save();
        return res.status(200).json({success:true,message:"Category added"})

    } catch (error) {
        return res.status(400).json({success:false,error:"Internal server error"})
    }
}

exports.getCategories = async (req,res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json({success:true,categories})

    } catch (error) {
        return res.status(400).json({success:false,error:"Internal server error"})
    }
}