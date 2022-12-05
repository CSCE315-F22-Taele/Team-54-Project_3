require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
// const path = require("path");
const morgan = require("morgan");
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieSession({
  name: "session",
  keys: ["estellaschen"],
  maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());


// app.use("/auth", authRoute);

// Import Routes
// Make one for each table in the database.
// const customers = require("../routes/customer");
// const employees = require("../routes/employees");
// const finances = require("../routes/finances");
// const inventory = require("../routes/inventory");
// const menu = require("../routes/menu");
// const orders = require("../routes/orders");


// app.use("/api/customers", customers);
// app.use("/api/employees", employees);
// app.use("/api/finances", finances);
// app.use("/api/inventory", inventory);
// app.use("/api/menu", menu);
// app.use("/api/orders", orders);
app.use("/auth", authRoute);


// ------------------------------------ CUSTOMER ------------------------------------
// get all customer items
app.get("/api/customers/customerItems", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM customers;");

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
    const results = await db.query("SELECT * FROM employees;");

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

// ------------------------------------ INVENTORY ------------------------------------
// get all inventory items
app.get("/api/inventory/inventoryItems", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM inventory;");

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
    const results = await db.query("SELECT * FROM menu;");

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
    
    const results = await db.query("INSERT INTO menu(menuid, name, price, category, ingredients) VALUES ($1, $2, $3, $4, $5)",
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
    const results = await db.query("SELECT * FROM orders;");

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

// "{"",""}"
// place an order
app.post("/api/orders/placeOrder", async (req, res) => {
try {
  const { orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered } = req.body;
  console.log(orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered);
  // console.log(req);
  


  orderItems = itemsordered.substring(1, itemsordered.length-1).split(",");
  
  
  
  
  const results = await db.query("INSERT INTO orders(orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  ", 
                                  [orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered]);

  res.status(200);
} catch (err) {
  console.log(err);
}
});


// ------------------------------------ Sales ------------------------------------
app.get("/api/sales/getSalesReport/:timeStart/:timeEnd", async (req, res) => {
  try {
    const timeStart = req.params.timeStart;
    const timeEnd = req.params.timeEnd;

    const menu = await db.query("SELECT name FROM menu ORDER BY menuid");
    const amountSold = [];
    const menuNames = [];

    // populate menuNames with all menu item names from database
    for (let i = 0; i < menu.rowCount; i++) {
      total.push(0);
      var tmp = JSON.stringify(menu.rows[i]);
      tmp = tmp.substring(tmp.indexOf("name") + 6, indexOf("\"", tmp.indexOf("name") + 6)); // gets menu name from table row
      menuNames.push(tmp);
    }

    // calculate amount of each menu item sold
    const allOrders = await db.query("SELECT itemsordered FROM orders WHERE saledate >= $1 AND saledate <= $2", [timeStart, timeEnd]);

    for (var i in allOrders.rows) {
      var tmp = JSON.stringify(allOrders.rows[i]);
      tmp = tmp.substring(16, tmp.length - 2);

      var splitOrder = tmp.split(",");

      for (var item in splitOrder) {
        amountSold[item] = amountSold[item] + 1;
      }
    }

    // create an object of menu items sold sorted from most to least items sold
    let reportArr = [];

    for (var item in amountSold) {
      let completeOrder = { name: menuNames[item], sold: amountSold[item] };
      reportArr.push(completeOrder);
    }

    reportArr.sort(function(a, b) {
      return b.sold - a.sold;
    });

    res.json(reportArr);
    res.status(200);
  } catch (err) {
    console.log(err);
  }
});



// ------------------------------------ Restock ------------------------------------




// ------------------------------------ Excess ------------------------------------




// ------------------------------------ OAUTH ------------------------------------





const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});