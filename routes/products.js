const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM products`;
    console.log(query);
    db.query(query)
      .then((data) => {
        const products = data.rows[0];
        res.json({ products });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
  return router;
};
