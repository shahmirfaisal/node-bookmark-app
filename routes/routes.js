const router = require("express").Router();
const bookmarkController = require("../controllers/bookmark");
const authController = require("../controllers/auth");
const signupValidator = require("../validators/signup");
const loginValidator = require("../validators/login");

router.get("/", bookmarkController.getBookmark);

router.get("/signup", authController.getSignup);

router.get("/login", authController.getLogin);

router.post("/signup", signupValidator, authController.postSignup);

router.post("/login", loginValidator, authController.postLogin);

module.exports = router;
