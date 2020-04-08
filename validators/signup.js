const { body } = require("express-validator/check");
const User = require("../models/user");

module.exports = [
  [
    body("name", "Please enter your name!").trim().isLength({ min: 1 }),
    body("email", "Invalid email!")
      .isEmail()
      .normalizeEmail()
      .custom((value) => {
        return User.find(value).then((user) => {
          if (user) return Promise.reject("This email is already in use!");
        });
      }),
    body("password", "Length of password should be between 6 and 32").isLength({
      min: 6,
      max: 32,
    }),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) return false;
      return true;
    }),
  ],
];
