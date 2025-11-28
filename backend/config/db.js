// backend/config/db.js
const mysql = require("mysql2");
require("dotenv").config();

console.log("Attempting to connect to MySQL with:");
console.log({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD ? "hidden" : "empty",
  database: process.env.DB_NAME || "pharmacy",
  port: process.env.DB_PORT || 3306
});

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "pharmacy",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

// TEST CONNECTION
pool.getConnection((err, connection) => {
  if (err) {
    console.error("DATABASE CONNECTION FAILED");
    console.error("Error code:", err.code);
    console.error("Error message:", err.message);
    if (err.code === "ER_BAD_DB_ERROR") console.error("→ Database 'pharmacy' does not exist!");
    if (err.code === "ER_ACCESS_DENIED_ERROR") console.error("→ Wrong MySQL username or password!");
    if (err.code === "ECONNREFUSED") console.error("→ MySQL server is not running on port 3306!");
  } else {
    console.log("Connected to MySQL database 'pharmacy' successfully!");
    connection.release();
  }
});

module.exports = pool.promise();   // ← THIS IS CRITICAL