import React, {useState, useRef} from "react";
import Menu from "../../components/Cards/MenuCustomer";
import Categories from "../../components/NavBar/CategoriesCustomer";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];
const conn = "http://localhost:3001";
const Customer = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);
  const orders = useRef([])

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
  const getOrders = (mapOrders) => {
    orders.current = [];
    let temp = Object.assign([], mapOrders);
    temp.forEach(food => {
      orders.current.push(food);
    });
  }

  const func = async () => {
    try {
      const response = await fetch(conn + "/api/menu/menuItems");
      const jsonVals = await response.json();
      // console.log("WORKING")
      // console.log(jsonVals);
    }
    catch (err) {
        console.log("ERROR");
        console.error(err.message);
    }
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