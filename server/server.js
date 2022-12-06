require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
// const path = require("path");
const morgan = require("morgan");
// const passport = require("passport");
// const cookieSession = require("cookie-session");
// const passportSetup = require("./passport");
// const authRoute = require("./routes/auth");
const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
// app.use(cookieSession({
//   name: "session",
//   keys: ["estellaschen"],
//   maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());


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
// app.use("/auth", authRoute);


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

// add item to inventory
app.post("/api/inventory/addInventoryItem", async (req, res) => {
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

// delete item from inventory
app.post("/api/inventory/deleteInventoryItem", async (req, res) => {
  try {

  const {itemName} = req.body;
    console.log(itemName);
    const results = await db.query("DELETE FROM inventory WHERE name = $1",
                                    [itemName]);

    res.status(200).send("Inventory Item Deletion Succeded.");
  } catch (err) {
    console.log(err);
    res.status(404).send("Inventory Item Deletion Failed.");
  }   
});

// ------------------------------------ MENU ------------------------------------
// get all menu items
app.get("/api/menu/menuItems", async (req, res) => {
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

// delete item from menu
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
  
  const getFreq = (map, array) => {
    array.forEach(item => {
      if(map[item]) map[item]++;
      else map[item] = 1;
    })
    return map;
  }
  
  try {
    console.log("BEGIN API CALL")
    const timeStart = req.params.timeStart;
    const timeEnd = req.params.timeEnd;
    console.log("timeStart", timeStart, "timeEnd", timeEnd)

    const report = await db.query("SELECT * FROM orders WHERE saledate >= $1 AND saledate <= $2", [timeStart, timeEnd]);
    const freq = new Map();
    for(let i = 0; i < report.rowCount; ++i)
    {
      const orderItems = report.rows[i].itemsordered;
      getFreq(freq, orderItems);
    }
    
    console.log(freq);
    
    res.status(200).json(freq);
  } catch (err) {
    console.error(err.message);

  }
});



// ------------------------------------ Restock ------------------------------------
app.get("/api/sales/getRestockReport/", async (req, res) => {
  const {threshold} = req.body;
  try {
    const report = await db.query("SELECT * FROM inventory WHERE quantity < $1", [threshold]);
    // console.log("SELECT * FROM inventory WHERE quantity < $1", [threshold]);
    const depletedItems = new Array(report.rowCount)
    for(let i = 0; i < report.rowCount; ++i)
    {
      const ingredientName = report.rows[i].name;
      const remainingQty = report.rows[i].quantity + " " + report.rows[i].unit;
      // getFreq(freq, orderItems);
      // console.log(ingredientName, ':', remainingQty);
      depletedItems[i] = [ingredientName, remainingQty];

    }
    // console.log("Reached here");
    // console.log(freq);
    
    res.status(200).json(depletedItems);
  } catch (err) {
    console.log(err);
  }
});



// ------------------------------------ Excess ------------------------------------




// ------------------------------------ OAUTH ------------------------------------





const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});