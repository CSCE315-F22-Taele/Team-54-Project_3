/**
 * This file describes the overarching parent (or grandparent) for all components displayed in the Customer user. It contains functionality
 * to filter the menu view by the selected category as well as keep track of the items in the current order as they are added. Data
 * from these two functions is passed down to its child components in order to have changes actually reflect on the web app and the
 * database. Also contains divs for the page title, navbar, and menu.
 * @author Neha Sujith
 * @author Estella Chen
 */
import React, {useState, useRef} from "react";
import Menu from "../../components/Cards/MenuCustomer";
import Categories from "../../components/NavBar/CategoriesCustomer";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];
const conn = "http://localhost:3001";
// const conn = "https://chick-fil-a-backend.onrender.com";

/**
 * Creates and displays the customer user skeleton by apportioning div space and describing basic view and order tracking functionality.
 * @returns A Customer object that contains the backbone functionality for the Customer user
 */
const Customer = () => {
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

export default Customer;