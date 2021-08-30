const db = require("../db");
const bcrypt = require("bcrypt");
const _ = require('lodash')
const { v4: uuidv4 } = require("uuid");
const { validateUsers: validate } = require("../helpers/validateUser");

const getUser = async (req, res) => {
  const { id } = req.params;
  await db.execute("SELECT * FROM USERS WHERE _id = ?", [id], (err, results) => {
    if (err) return console.log(err);
    const user = results[0]
    res.status(201).send({ success: true, user: _.pick(user, ["_id", "firstname", "lastname", "email", "gender", "age"]) });
  });
};

const getUsers = async (req, res) => {
  await db.execute("SELECT * FROM USERS", (err, results) => {
    if (err) return console.log(err);
    console.log(results);
    res.status(201).send({ success: true, users: results });
  });
};

const createUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error)
    return res
      .status(400)
      .send({ success: false, message: error.details[0].message });

  await db.execute(
    "SELECT * FROM users where email = ?",
    [req.body.email],
    async (err, results, fields) => {
      if (err) return console.log(err);
      if (results[0])
        return res.status(400).send({ success: false, message: "User exists" });
      const { _id, firstname, lastname, email, password, gender, age } =
        req.body;

      const salt = await bcrypt.genSalt(10);
      const encPass = await bcrypt.hash(password, salt);
      const id = uuidv4();

      await db.execute(
        "INSERT INTO users (_id, firstname, lastname, email, password, gender, age) VALUES(?,?,?,?,?,?,?)",
        [id, firstname, lastname, email, encPass, gender, age],
        (err, result) => {
          if (err) return console.log(err);
          res
            .status(201)
            .send({ success: true, message: "User created successfully" });
        }
      );
    }
  );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
