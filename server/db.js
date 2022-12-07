/**
 * This file creates a container for the credentials to log into the database.
 * @author Krishnan Prashanth
 */
const Pool = require("pg").Pool;
console.log("Username::" + process.env.PGUSER + "\n");
console.log("Password::" + process.env.PGPASSWORD + "\n");
console.log("Host::" + process.env.PGHOST + "\n");
console.log("Port::" + process.env.PGPORT + "\n");
console.log("Database::" + process.env.PGDATABASE + "\n");
// console.log("Username::" + process.env.PGUSER + "\n");

/**
 * Constructs a Pool object to store the user credentials used to log into the database. Stores the user name, password,
 * host name, port number, and database name.
 */
const pool = new Pool(
  {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {rejectUnauthorized: false}
  }
);

module.exports = pool;