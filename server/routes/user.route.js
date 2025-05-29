const router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/ImageUpload.js")

// sign-up api
router.post("/sign-up", userController.signupUser);

// login
router.post("/log-in", userController.loginUser);

// check cookie
router.get("/check-cookie", userController.checkCookie);

// logout
router.post("/logout", userController.logout);

router.get(
  "/getProfileData",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  userController.getProfileData
);

// update password
router.patch(
  "/changeUserPassword",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  userController.changeUserPassword
);

// change avatar
router.put(
  "/changeAvatar",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  upload.single("image"),
  userController.changeAvatar
);


// change avatar
router.get(
  "/getFavouriteBlogsOfAUser",
  authMiddleware.verifyToken,
  authMiddleware.authorizeRole("user"),
  userController.getFavouriteBlogsOfAUser
);


module.exports = router;
