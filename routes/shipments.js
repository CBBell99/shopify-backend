const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router
    .get("/", (req, res) => {
      db.query(`SELECT * FROM shipments;`)
        .then((data) => {
          console.log(data.rows);
          const shipments = data.rows;
          res.json({ ...shipments });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .post("/", (req, res) => {
      db.query(
        `INSERT INTO shipments(user_id, product_id)
        VALUES ($1, $2) RETURNING *`,
        [req.body.user_id, req.body.product_id]
      ).then((data) => {
        const shipments = data.rows[0];
        res.json({ shipments });
      });
    });
  return router;
};
