const router = require("express").Router();
const categoryController = require("../controllers/category.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

router.post(
  "/addCategory",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("admin"),
  categoryController.addCategory
);

router.get(
  "/getCategory",
  categoryController.getCategories
);

module.exports = router;
