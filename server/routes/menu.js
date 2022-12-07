const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/menuItems", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM menu ORDER BY menuid ASC;");

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

// add item to menu
app.post("/addMenuItem", async (req, res) => {
  try {

    const {menuid, name, price, category, ingredients} = req.body;
    
    const results = await db.query("INSERT INTO menu(menuid, name, price, category, 0) VALUES ($1, $2, $3, $4, $5)",
                                    [menuid, name, price, category, ingredients]);
    res.status(200).send("Menu Item Addition Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Menu Item Addition Failed.");
  }
});

// delete item from menu
app.post("/deleteMenuItem", async (req, res) => {
  try {

    const {itemID} = req.body;
    
    const results = await db.query("DELETE FROM menu WHERE menuid = $1",
                                    [itemID]);

    res.status(200).send("Menu Item Deletion Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Menu Item Deletion Failed.");
  }   
});

module.exports = app;