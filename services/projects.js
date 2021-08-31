const db = require('../config/db')
const _ = require("lodash");
const bcrypt = require("bcrypt");


module.exports = {
  create: async (data, callback) => {
    
    const { id, title, description, duration, startdate} = data;
    const exec = await db.query("INSERT INTO projects (_id, title, description, duration, startdate) VALUES(?,?,?,?,?)", [id, title, description, duration, startdate]);
    if (exec.affectedRows) {
      const project = await db.query("SELECT * FROM projects where _id = ?", [id])

      callback(null, project[0])
    }
  },

  getAll: async (callback) => {
    try {
      const projects = await db.query("SELECT * FROM projects");
      callback(null, projects);
    } catch (err) {
      callback(err);
    }

  },

  getOne: async (id, callback) => {
    try {
      const results = await db.query("SELECT * FROM projects WHERE _id = ?", [id]);
      callback(null, results[0]);
    } catch (err) {
      callback(err);
    }
  }
};
