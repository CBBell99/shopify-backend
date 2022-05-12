// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const morgan = require("morgan");

// database
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// Routes
const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const shipmentsRoutes = require("./routes/shipments");

app.use("/api/users/", usersRoutes(db));
app.use("/api/products/", productsRoutes(db));
app.use("/api/shipments/", shipmentsRoutes(db));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
