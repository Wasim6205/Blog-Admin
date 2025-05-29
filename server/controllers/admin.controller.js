const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog.model.js");
const Category = require("../models/category.model.js")

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const checkPass = await bcrypt.compare(password, existingUser.password);
    if (!checkPass) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie("blogsapp", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//create-blog
exports.addBlog = async (req, res) => {
  try {
    const {title,description,category} = req.body
    if(!title || !description || !category){
        return res.status(400).json({error:"All fields are required"});
    }
    if(!req.file){
        return res.status(400).json({error:"Image is required"});
    }
    const existingCat = await Category.findOne({title:category});
    if(!existingCat){
      return res.status(400).json({error:"The category does not exist"});
    }
    const newBlog = new Blog({title,description,image:req.file.path});
    await newBlog.save();
    existingCat.blogs.push(newBlog._id);
    await existingCat.save();
    return res.status(200).json({success:true,message:"Blog Added"})
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
