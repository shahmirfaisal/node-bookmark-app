exports.getBookmark = (req, res, next) => {
  if (!req.session.isLogin) return res.redirect("/login");
  res.render("./index", {
    pageTitle: "Bookmark App",
  });
};
