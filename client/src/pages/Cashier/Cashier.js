/**
 * This file describes the overarching parent for all components displayed in the Cashier user. It contains functionality to filter
 * the menu view by the user's selected category as well as keep track of the items in the user's current order. It also 
 * displays the divs containing the page title, navbar, and menu cards
 * @author Neha Sujith
 * @author Estella Chen
 */
import React, {useState, useRef} from "react";
import Menu from "../../components/Cards/MenuCashier";
import Categories from "../../components/NavBar/CategoriesCashier";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];
// const conn = "http://localhost:3001";
const conn = "https://chick-fil-a-backend.onrender.com";

/**
 * Creates the Cashier object, which divides the webpage into spaces for the title, navbar, and menu while containing functionality
 * to filter the menu by category
 * @returns A Cashier object to take care of the base functionality to enable each of the components used in the Cashier user.
 */
const Cashier = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);
  const orders = useRef([])

  /**
   * Filter's the user's menu view by the selected category
   * @param {String} category The name of the category of menu items the user wants to view
   * @returns default return for showing all menu items
   */
  const filterItems = async (category) => {
    try {
      const response = await fetch(conn + "/api/menu/menuItems");
      const jsonVals = await response.json();
      console.log("WORKING")
      console.log(jsonVals.data.table);
      setActiveCategory(category);
      if (category === "All Items") {
        setMenuItems(jsonVals.data.table);
        return;
      }
      const newItems = jsonVals.data.table.filter((item) => item.category === category);
      setMenuItems(newItems);
    }
    catch (err) {
        console.log("ERROR");
        console.error(err.message);
    }
  };

  /**
   * Keeps track of the items in the current order
   * @param {Array} mapOrders a list of items in the current order
   */
  const getOrders = (mapOrders) => {
    orders.current = [];
    let temp = Object.assign([], mapOrders);
    temp.forEach(food => {
      orders.current.push(food);
    });
  }

  return (
    <main>
        <div className="title">
          <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Menu List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
          pls = {orders}
        />
        <div className="container">
          <div className="menu-align">
            <Menu items={menuItems} sendOrders = {getOrders}/>
          </div>
        </div>
    </main>
  );
};

export default Cashier;