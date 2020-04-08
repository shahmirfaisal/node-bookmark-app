const getDb = require("../database/database").getDb;

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static find(email) {
    const db = getDb();
    return db
      .collection("users")
      .find({ email })
      .next()
      .then((user) => user)
      .catch((err) => console.log(err));
  }
};
