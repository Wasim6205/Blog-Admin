const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup-controller
exports.signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // does the username or email exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "username or email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPass });
    await newUser.save();
    return res.status(200).json({ success: true, message: "Account created" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// login-controller
exports.loginUser = async (req, res) => {
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

// CHECK-COOKIE
exports.checkCookie = async (req, res) => {
  try {
    const token = req.cookies.blogsapp;
    if (token) {
      return res.status(200).json({ message: true });
    }
    return res.status(200).json({ message: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// logout
exports.logout = async (req, res) => {
    res.clearCookie("blogsapp", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/"
});
  res.json({ message: "Logged out successfully" });
};

// getProfile data
exports.getProfileData = async (req,res) => {
    try {
        const {user} = req;
        const {password, ...safeUserData} = user._doc;
        // console.log(safeUserData);
        res.status(200).json({data:safeUserData})
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

// change user password
exports.changeUserPassword = async (req,res) => {
    try {
        const {user} = req;
        const {password,newPass,confirmNewPass} = req.body;
        if(!password || !newPass || !confirmNewPass){
            return res.status(400).json({error:"All fields are required"})
        }
        if(newPass !== confirmNewPass){
            return res.status(400).json({error:"New password and confirm new password are not same"})
        }
        const ActualPassword = user.password;
        const checkPass = await bcrypt.compare(password,ActualPassword);
        if(!checkPass){
            return res.status(400).json({success:false,error:"Password is not valid"})
        }

        user.password = await bcrypt.hash(confirmNewPass,10)
        await user.save();
        return res.status(200).json({message:"Password updated successfully"})
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

// change changeAvatar
exports.changeAvatar = async (req,res) => {
    try {
        const {user} = req;

        if(!req.file){
            return res.status(400).json({error:"No image file uploaded."});
        }
        
        // console.log(req.file.path);
        user.avatar = req.file.path;
        await user.save();

        return res.status(200).json({message:"Avatar updated successfully"})
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

// getFavouriteBlogsOfAllUser
exports.getFavouriteBlogsOfAUser = async (req,res) => {
    try {
        const {user} = req;
        const populatedUser = await User.findById(user._id).populate('favouriteBlogs')
        const favouriteBlogs = populatedUser.favouriteBlogs;
        res.status(200).json({success:true, favouriteBlogs})
    } catch (error) {
        return res.status(500).json({success:false,error:"Internal sever error"});
    }
}
