const {createPool, createConnection} = require("mysql2");
let db = null;
try {
  // db = mysql2.createConnection({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   database: process.env.MYSQL_DB,
  // });
  console.log("Connected to database successfully");
} catch (error) {
  throw new Error(error)
}
module.exports = db;
