const router = require("express").Router();
const adminController = require("../controllers/admin.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/ImageUpload.js");

router.post("/adminLogin", adminController.adminLogin);

// Add-Blogs
router.post(
  "/addBlog",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  upload.single("image"),
  adminController.addBlog
);

module.exports = router;
