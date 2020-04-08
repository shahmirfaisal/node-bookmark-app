const express = require("express");
const mongoConnect = require("./database/database").mongoConnect;
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoSession = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const path = require("path");
const router = require("./routes/routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const store = new MongoSession({
  uri:
    "mongodb+srv://shahmir:programmingchola@cluster0-3jbwc.mongodb.net/bookmark?retryWrites=true&w=majority",
  collection: "sessions",
});

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "Secret", resave: false, saveUninitialized: false, store })
);
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(router);

mongoConnect(() => {
  app.listen(3000);
});
