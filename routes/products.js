const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      let query = `SELECT * FROM products`;
      db.query(query)
        .then((data) => {
          console.log(data.rows);
          const products = data.rows;
          res.json({ ...products });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    })
    .post("/", (req, res) => {
      console.log("here", req.body);
      const query = `INSERT INTO products(product_name, quantity)
      VALUES ($1, $2) RETURNING *`;
      db.query(query, [req.body.product_name, req.body.quantity]).then(
        (data) => {
          const products = data.rows[0];
          res.json({ products });
        }
      );
    });
  return router;
};
