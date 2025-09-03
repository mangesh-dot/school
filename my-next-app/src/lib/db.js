// import mysql from "mysql2/promise";
// import fs from "fs";

// // Create a connection pool
// export const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
//    ssl: {
//     , // Verify server certificate
//   },
// });

import mysql from "mysql2/promise";

let sslConfig = false;

if (process.env.NODE_ENV === "production" && process.env.DB_CA) {
  sslConfig = {
    ca: process.env.DB_CA.replace(/\\n/g, "\n"), // handle multiline
  };
}

export const db = mysql.createPool({
  host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
  port: process.env.DB_PORT || 3306,
  ssl: sslConfig,
});

