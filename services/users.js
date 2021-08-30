const db = require('../config/db')
const _ = require("lodash");
module.exports = {
  create:  async (data, callback) => {
// fff/
    const result = await db.query("SELECT * FROM users where email = ?", [data.email])
    if (result[0]) return callback("User exists");

    const { id, firstname, lastname, email, password, gender, age } = data;
    const exec = await db.query("INSERT INTO users (_id, firstname, lastname, email, password, gender, age) VALUES(?,?,?,?,?,?,?)",[id, firstname, lastname, email, password, gender, age]);
    if(exec.affectedRows){
      const user = await db.query("SELECT * FROM users where email = ?", [data.email])
      callback(null,  _.pick(user[0], [
        "_id",
        "firstname",
        "lastname",
        "email",
        "gender",
        "age",
      ]))
    }

    // db.execute(
    //   "SELECT * FROM users where email = ?",
    //   [data.email],
    //   async (err, results, fields) => {
    //     if (err) return callback(err);
    //     if (results[0]) return callback("User exists");

        // const { id, firstname, lastname, email, password, gender, age } =
        //   data;
    //     db.execute(
    //       "INSERT INTO users (_id, firstname, lastname, email, password, gender, age) VALUES(?,?,?,?,?,?,?)",
    //       [id, firstname, lastname, email, password, gender, age],
    //       (err, result) => {
    //         if (err) return callback(err);
    //         return callback(null, "User created successfully");
    //       }
    //     );
    //   }
    // );
  },

  getAll: (callback)=>{
    db.execute("SELECT * FROM USERS", (err, results) => {
        if (err) return callback(err);
        callback(null, _.map(results, _.partialRight(_.pick, [
            "_id",
            "firstname",
            "lastname",
            "email",
            "gender",
            "age",
          ])));
      });
  },

  getOne: (id, callback)=>{
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
          ]),);
      });
  }


};
