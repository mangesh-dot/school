import mysql from "mysql2/promise";

// Create a connection pool
export const pool = mysql.createPool({
  host: "localhost",     // your DB host
  user: "root",          // your DB username
  password: "password", // your DB password
  database: "school_db", // your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
