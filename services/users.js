const db = require('../config/db')
const _ = require("lodash");
module.exports = {
  create: async (data, callback) => {
    const result = await db.query("SELECT * FROM users where email = ?", [data.email])
    if (result[0]) return callback("User exists");

    const { id, firstname, lastname, email, password, gender, age, contact } = data;
    const exec = await db.query("INSERT INTO users (_id, firstname, lastname, email, password,contact ,gender, age) VALUES(?,?,?,?,?,?,?)", [id, firstname, lastname, email, password, contact, gender, age]);
    if (exec.affectedRows) {
      const user = await db.query("SELECT * FROM users where email = ?", [data.email])
      callback(null, _.pick(user[0], [
        "_id",
        "firstname",
        "lastname",
        "email",
        "gender",
        "age",
        "contact",
      ]))
    }
  },

  getAll: async (callback) => {
    try {


      const users = await db.query("SELECT * FROM USERS");
      callback(null, _.map(users, _.partialRight(_.pick, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "gender",
        "age",
      ])));
    } catch (error) {

      if (err) return callback(err);
    }

  },

  getOne: (id, callback) => {
    db.execute("SELECT * FROM USERS WHERE _id = ?",
      [id], (err, results) => {
        if (err) return callback(err);
        callback(null, _.pick(results[0], [
          "_id",
          "firstname",
          "lastname",
          "email",
          "gender",
          "age",
        ]));
      });
  }


};
