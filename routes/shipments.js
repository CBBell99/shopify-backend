const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM shipments;`)
      .then((data) => {
        console.log(data.rows);
        const shipments = data.rows;
        res.json({ shipments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
