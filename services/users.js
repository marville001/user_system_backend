const db = require('../config/db')
const _ = require("lodash");
const bcrypt = require("bcrypt");


module.exports = {
  create: async (data, callback) => {
    const result = await db.query("SELECT * FROM users where email = ?", [data.email])
    if (result[0]) return callback("User exists");

    const { id, firstname, lastname, email, password, gender, age, contact } = data;
    const exec = await db.query("INSERT INTO users (_id, firstname, lastname, email, password,contact ,gender, age) VALUES(?,?,?,?,?,?,?,?)", [id, firstname, lastname, email, password, contact, gender, age]);
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
      const users = await db.query("SELECT * FROM users");
      callback(null, _.map(users, _.partialRight(_.pick, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "gender",
        "age",
        "contact"
      ])));
    } catch (err) {
      callback(err);
    }

  },

  getOne: async (id, callback) => {
    try {
      const results = await db.query("SELECT * FROM users WHERE _id = ?", [id]);
      callback(null, _.pick(results[0], [
        "_id",
        "firstname",
        "lastname",
        "email",
        "gender",
        "age",
        "contact"
      ]));
    } catch (err) {
      callback(err);
    }
  },
  deleteUser: async (id, callback) => {
    try {
      const results = await db.query("DELETE  FROM users WHERE _id = ?", [id]);
      callback(null, "User deleted successfully");
    } catch (err) {
      callback(err);
    }
  },

  login: async (data, callback) => {
    try {
      const results = await db.query("SELECT * FROM users WHERE email = ?", [data.email]);
      const user = results[0];
      if (!user) return callback("User does not exist")

      const validPassword = await bcrypt.compare(data.password, user.password);
      if (!validPassword) return callback("Invalid Details")

      callback(null, _.pick(user, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "gender",
        "age",
        "contact"
      ]));

    } catch (err) {
      console.log(JSON.stringify());
      callback(err.message);
    }
  }




};
