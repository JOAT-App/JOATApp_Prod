
/*
Connect to database, enter your port and database name that you are locally running.
when we spin up the app in browser how are we going to store the authentication tokens?
Like in foundry, for some api keys which really do matter but still aren't super important...
Scott uses .config file in browser that is really insecure. It's a short term solution rather
than making an endpoint for all the authentication.
*/

const Pool = require('pg').Pool;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT

  // connectionString: process.env.DATABASE_URI,
  // ssl: {
  //   rejectUnauthorized: false
  // }
})


module.exports = pool;
