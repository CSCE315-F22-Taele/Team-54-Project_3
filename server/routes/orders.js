const express = require("express");
const app = express.Router();
const db = require("../db");

// get all orders
app.get("/orderItems", async (req, res) => {
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
app.post("/placeOrder", async (req, res) => {
try {
  const { orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered } = req.body;
  console.log(orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered);
  // console.log(req);

  orderItems = itemsordered.substring(1, itemsordered.length-1).split(", ");
  console.log(orderItems);
  var orderIng = new Array();
  for(var i = 0; i < orderItems.length; ++i)
  {
    // console.log("SELECT ingredients FROM menu WHERE name = $1", orderItems[i])
    const ingNeeded = await db.query("SELECT ingredients FROM menu WHERE name = $1", [orderItems[i]]);
    for(var j = 0; j < ingNeeded.rows.length; ++j)
      orderIng = orderIng.concat(ingNeeded.rows[j].ingredients);
  }

  for(var i = 0; i < orderIng.length; ++i)
  {
    const t = orderIng[i].lastIndexOf(" ");
    orderIng[i] = [orderIng[i].substring(0, t), parseFloat(orderIng[i].substring(t+1))]
  }

  console.log(orderIng);
  var pos = true;
  for(var k = 0; k < orderIng.length; ++k)
  {
    var qty = await db.query("SELECT quantity FROM inventory WHERE name = $1", [orderIng[k][0]]);
    qty = qty.rows[0]
    if(qty.quantity > orderIng[k][1]) res.status(404);
    // console.log(`UPDATE inventory SET quantity=${qty.quantity - orderIng[k][1]} WHERE name = ${orderIng[k][0]}`)
    db.query("UPDATE inventory SET quantity=$1 WHERE name = $2", [qty.quantity - orderIng[k][1], orderIng[k][0]]);
  }

  const results = await db.query("INSERT INTO orders(orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  ", 
                                  [orderid, ordernumber, totalprice, saledate, employeeid, customerid, satisfied, itemsordered]);

  res.status(200);
} catch (err) {
  console.log(err);
  res.status(404);

}
});

module.exports = app;