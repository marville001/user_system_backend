const db = require('../config/db')
const _ = require("lodash");
const bcrypt = require("bcrypt");


module.exports = {
  create: async (data, callback) => {

    const { id, projectid, title, description} = data;
    const results = await db.query("SELECT * FROM projects WHERE _id = ?", [projectid]);
    if(!results[0]) return callback("Invalid Project id");
    
    const exec = await db.query("INSERT INTO tasks (_id, projectid, title, description) VALUES(?,?,?,?)", [id, projectid, title, description]);
    if (exec.affectedRows) {
      const results = await db.query("SELECT * FROM tasks where _id = ?", [id])
      callback(null, results[0])
    }
  },

  getAll: async (callback) => {
    try {
      const tasks = await db.query("SELECT * FROM tasks");
      callback(null, tasks);
    } catch (err) {
      callback(err);
    }

  },

  getOne: async (id, callback) => {
    try {
      const results = await db.query("SELECT * FROM tasks WHERE _id = ?", [id]);
      callback(null, results[0]);
    } catch (err) {
      callback(err);
    }
  }
};
