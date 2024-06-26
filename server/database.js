const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

pool.connect((err) => {
    if (err) {
        console.log('Error connecting to database', err)
    }
    console.log('Connected to database')
})

module.exports = pool