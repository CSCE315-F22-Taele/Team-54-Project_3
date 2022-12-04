require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());


// Import Routes

const customer = require("../routes/customer");
const employees = require("../routes/employees");
const finances = require("../routes/finances");
const inventory = require("../routes/inventory");
const menu = require("../routes/menu");
const orders = require("../routes/orders");
// const customer = require("../routes/customer");



// get all menu items
app.get("/api/v1/menuItems", async (req, res) => {
    try {
      const results = await db.query("select * from menu;");
  
      res.status(200).json({
        status: "success",
        results: results.rows.length,
        data: {
          restaurants: results.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });



// place an order
app.put("/api/v1/placeOrder", async (req, res) => {
    try {
      //const results = await db.query("select * from restaurants");
      const menuItems = await db.query("");
  
      res.status(200).json({
        status: "success",
        results: menuItems.rows.length,
        data: {
          restaurants: menuItems.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
  });

// update inventory based off of order
app.post("")



const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});