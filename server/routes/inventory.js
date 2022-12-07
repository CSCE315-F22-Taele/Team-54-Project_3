const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/inventoryItems", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM inventory ORDER BY itemid ASC;");

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


app.post("/addInventoryItem", async (req, res) => {
  try {

    const {itemid, name, category, expirationdate, fridgerequired, quantity, unit} = req.body;
    console.log(itemid, name, category, expirationdate, fridgerequired, quantity, unit);
    
    const results = await db.query("INSERT INTO inventory(itemid, name, category, expirationdate, fridgerequired, quantity, unit) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                                    [itemid, name, category, expirationdate, fridgerequired, quantity, unit]);

    res.status(200).send("Inventory Item Addition Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Inventory Item Addition Failed.");
  }
});


app.post("/deleteInventoryItem", async (req, res) => {
  try {

    const {itemID} = req.body;
    console.log("item id")
    console.log(itemID);
    const results = await db.query("DELETE FROM inventory WHERE itemid = $1",
                                    [itemID]);

    res.status(200).send("Inventory Item Deletion Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Inventory Item Deletion Failed.");
  }   
});


module.exports = app;