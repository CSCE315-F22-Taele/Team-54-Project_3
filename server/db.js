const Pool = require("pg").Pool;
console.log("Username::" + process.env.PGUSER + "\n");
console.log("Password::" + process.env.PGPASSWORD + "\n");
console.log("Host::" + process.env.PGHOST + "\n");
console.log("Port::" + process.env.PGPORT + "\n");
console.log("Database::" + process.env.PGDATABASE + "\n");
// console.log("Username::" + process.env.PGUSER + "\n");

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