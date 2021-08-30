const {createPool, createConnection} = require("mysql2");
let db = null;
try {
  // db = mysql2.createConnection({
  //   host: process.env.DB_HOST,
  //   user: process.env.DB_USER,
  //   database: process.env.MYSQL_DB,
  // });
  console.log("Connected to database successfully");

  db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  })
} catch (error) {
  throw new Error(error)
}
module.exports = db;
