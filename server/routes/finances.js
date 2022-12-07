const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/financeItems", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM finances;");

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        table: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = app;