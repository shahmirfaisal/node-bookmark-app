const express = require("express");
const mongoConnect = require("./database/database").mongoConnect;
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoSession = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const store = new MongoSession({
  uri:
    "mongodb+srv://shahmir:programmingchola@cluster0-3jbwc.mongodb.net/bookmark?retryWrites=true&w=majority",
  collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({ secret: "Secret", resave: false, saveUninitialized: false, store })
);
app.use(csrf());

mongoConnect(() => {
  app.listen(3000);
});
