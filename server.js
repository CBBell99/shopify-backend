// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const morgan = require("morgan")

// database
const { Pool } = require('pg');
const dbParams = require("./lib/db")
const db = new Pool(dbParams)
db.connect();

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

app.get('/', (req, res) =>
  res.send("hello")
)

app.get('/products', (req, res) => {
  db.query(`SELECT * FROM products`)
    .then((data) => res.json(data.rows))
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})