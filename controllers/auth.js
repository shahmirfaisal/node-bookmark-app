const User = require("../models/user");
const { validationResult } = require("express-validator/check");

exports.getSignup = (req, res, next) => {
  res.render("./signup", {
    pageTitle: "Signup",
  });
};

exports.getLogin = (req, res, next) => {
  res.render("./login", {
    pageTitle: "Login",
  });
};

exports.postSignup = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).render("./signup", { pageTitle: "Signup" });
  }
  const user = new User(name, email, password);
  user.save().then((result) => {
    console.log(result.ops[0]);
    req.session.isLogin = true;
    req.session.user = result.ops[0];
    req.session.save((err) => res.redirect("/"));
  });
};

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).render("./login", { pageTitle: "Login" });

  User.find(req.body.email).then((user) => {
    req.session.isLogin = true;
    req.session.user = user;
    req.session.save((err) => res.redirect("/"));
  });
};
