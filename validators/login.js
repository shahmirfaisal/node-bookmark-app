const { body } = require("express-validator/check");
const User = require("../models/user");

module.exports = [
  [
    body("email", "Invalid email!")
      .isEmail()
      .normalizeEmail()
      .custom((value) => {
        return User.find(value).then((user) => {
          if (!user)
            return Promise.reject("There is no user with this email address!");
        });
      }),
    body("password", "Length of password should be between 6 and 32")
      .isLength({
        min: 6,
        max: 32,
      })
      .custom((value, { req }) => {
        return User.find(req.body.email).then((user) => {
          if (user.password !== value)
            return Promise.reject("Password is wrong!");
        });
      }),
  ],
];
