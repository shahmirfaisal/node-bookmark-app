const User = require("../models/user");
const { validationResult } = require("express-validator/check");

exports.getSignup = (req, res) => {
  res.render("./signup", {
    pageTitle: "Signup",
  });
};

exports.getLogin = (req, res) => {
  res.render("./login", {
    pageTitle: "Login",
  });
};

exports.postSignup = (req, res) => {
  const { name, email, password } = req.body;

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).render("./signup", { pageTitle: "Signup" });
  }
  const user = new User(name, email, password);
  user.save().then((result) => {
    console.log(result.ops[0]);
    req.session.isLogin = true;
    req.session.user = result.ops[0];
    req.session.save(() => res.redirect("/"));
  });
};

exports.postLogin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(422).render("./login", { pageTitle: "Login" });

  User.find(req.body.email).then((user) => {
    req.session.isLogin = true;
    req.session.user = user;
    req.session.save(() => res.redirect("/"));
  });
};

exports.postSignout = (req, res) => {
  req.session.isLogin = false;
  req.session.user = null;
  req.session.save(() => res.redirect("/login"));
};
