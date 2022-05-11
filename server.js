// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const morgan = require("morgan")

app.use(morgan("dev"))

app.get('/', (req, res) =>
  res.send("hello")
)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})