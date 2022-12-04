require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
// const path = require("path");
const morgan = require("morgan");

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());


// Import Routes
// Make one for each table in the database.
// const customer = require("../routes/customer");
// const employees = require("../routes/employees");
// const finances = require("../routes/finances");
// const inventory = require("../routes/inventory");
// const menu = require("../routes/menu");
// const orders = require("../routes/orders");
// const customer = require("../routes/customer");


// app.use("/api/customer", customer);
// app.use("/api/employees", employees);
// app.use("/api/finances", finances);
// app.use("/api/inventory", inventory);
// app.use("/api/menu", menu);
// app.use("/api/orders", orders);


// ------------------------------------ CUSTOMER ------------------------------------
// get all customer items
app.get("/api/customer/customerItems", async (req, res) => {
  try {
    const results = await db.query("select * from customer;");

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


// ------------------------------------ EMPLOYEES ------------------------------------
// get all employee items
app.get("/api/employees/employeeItems", async (req, res) => {
  try {
    const results = await db.query("select * from employees;");

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


// ------------------------------------ FINANCES ------------------------------------
// get all finances items
app.get("/api/finances/financeItems", async (req, res) => {
  try {
    const results = await db.query("select * from finances;");

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

// ------------------------------------ INVENTORY ------------------------------------
// get all inventory items
app.get("/api/customer/customerItems", async (req, res) => {
  try {
    const results = await db.query("select * from customer;");

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

// ------------------------------------ MENU ------------------------------------
// get all menu items
app.get("/api/menu/menuItems", async (req, res) => {
  try {
    const results = await db.query("select * from menu;");

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

app.post("/api/menu/addMenuItem", async (req, res) => {
  
  
  try {

    const {menuid, name, price, category, ingredients} = req.body;
    
    const results = await db.query("INSERT INTO MENU(menuid, name, price, category, ingredients) VALUES ($1, $2, $3, $4, $5)",
                                    [menuid, name, price, category, ingredients]);

    res.status(200).send("Menu Item Addition Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Menu Item Addition Failed.");
  }
});

app.post("/api/menu/deleteMenuItem", async (req, res) => {
  try {

  const {itemName} = req.body;
    
    const results = await db.query("DELETE FROM menu WHERE name = $1",
                                    [itemName]);

    res.status(200).send("Menu Item Deletion Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Menu Item Deletion Failed.");
  }

   
});
// ------------------------------------ ORDERS ------------------------------------
// get all orders
app.get("/api/orders/orderItems", async (req, res) => {
  try {
    const results = await db.query("select * from orders;");

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

// place an order
app.post("/api/orders/placeOrder", async (req, res) => {
try {
  const { orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered } = req.body;
  console.log(orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered);
  const results = await db.query("INSERT INTO orders(orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  ", 
                                  [orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered]);

  res.status(200);
} catch (err) {
  console.log(err);
}
});


// ------------------------------------ OAUTH ------------------------------------





const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});