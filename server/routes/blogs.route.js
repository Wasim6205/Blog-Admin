const router = require("express").Router();
const blogsController = require("../controllers/blog.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

// fetch all blogs
router.get("/fetchAllBlogs", blogsController.fetchAllBlogs);

// fetch recent blogs
router.get("/fetchRecentBlogs", blogsController.fetchRecentBlogs);

// fetch recent blogs
router.get("/getBlodById/:id", blogsController.getBlodById);

// addBlogsToFavourite
router.put(
  "/addBlogsToFavourite/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  blogsController.addBlogsToFavourite
);

// removeBlogsFromFavourite
router.put(
  "/removeBlogsFromFavourite/:id",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  blogsController.removeBlogsFromFavourite
);

module.exports = router;
