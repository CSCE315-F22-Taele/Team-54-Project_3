const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/getSalesReport/:timeStart/:timeEnd", async (req, res) => {
  
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

    var arr = [];

    for (var key in freq) {
        if (freq.hasOwnProperty(key)) {
            arr.push( [ key, freq[key] ] );
        }
    }
    
    // console.log(freq);
    
    res.status(200).json({
      status: "success",
      results: arr.length,
      data: {
        table: arr,
      },
    });
  } catch (err) {
    console.error(err.message);

  }
});



// ------------------------------------ Restock ------------------------------------
app.get("/getRestockReport", async (req, res) => {
  const threshold = 105;
  try {
    const report = await db.query("SELECT * FROM inventory WHERE quantity < $1", [threshold]);
    console.log(report.rows);
    // console.log("SELECT * FROM inventory WHERE quantity < $1", [threshold]);
    // const depletedItems = new Array(report.rowCount);
    const returnVal = new Map();
    for(let i = 0; i < report.rowCount; ++i)
    {
      const ingredientName = report.rows[i].name;
      const remainingQty = report.rows[i].quantity + " " + report.rows[i].unit;
      // getFreq(freq, orderItems);
      // console.log(ingredientName, ':', remainingQty);
      // depletedItems[i] = [ingredientName, remainingQty];
      returnVal[ingredientName] = remainingQty;
    }
    // console.log("Reached here");
    // console.log(freq);
    // console.log(returnVal);
    res.status(200).json({
      status: "success",
      results: returnVal.length,
      data: {
        table: returnVal,
      },
    });  } catch (err) {
    console.log(err);
  }
});


app.get("/getExcessReport/:timeStart", async (req, res) => {

    try {
      const timeStart = req.params.timeStart;
      console.log("start", timeStart);
    //   const timeEnd = req.params.timeEnd;
    //   console.log("timeStart", timeStart, "timeEnd", timeEnd)
      const extraItems = new Array();
      const report = await db.query("SELECT * FROM inventory");
      for(let i = 0; i < report.rowCount; ++i)
      {
        // const orderItems = report.rows[i].itemsordered;
        // getFreq(freq, orderItems);
        const qty = report.rows[i].quantity;
        if(qty >= 90)
            extraItems.push([report.rows[i].name, report.rows[i].quantity]);

      }
      
      console.log(extraItems);
      
      res.status(200).json({
        status: "success",
        results: extraItems.length,
        data: {
          table: extraItems,
        },
      });
    } catch (err) {
      console.error(err.message);
      res.status(404);
  
    }
  });


module.exports = app;