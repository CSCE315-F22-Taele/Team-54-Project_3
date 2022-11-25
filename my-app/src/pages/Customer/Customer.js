import React, {useState, useRef} from "react";
import Menu from "../../components/Cards/Menu";
import Categories from "../../components/NavBar/CustomerCategories";
import items from "../../components/Cards/menuData";
import OrderPanel from "../../components/Panel/OrderPanel";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];

const Customer = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);
  // const [orders, setOrders] = useState([]);
  const orders = useRef([])

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "All Items") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
  const getOrders = (mapOrders) => {
    console.log("Customer received orders!!! YAYYAY")
    // console.log(mapOrders);
    orders.current = [];
    let temp = Object.assign([], mapOrders);
    temp.forEach(food => {
      orders.current.push(food);
    });
    console.log(orders.current);
  }

  return (
    <main>
        <div className="title">
          {/* <img src={logo} alt="logo" className="logo" /> */}
          <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Menu List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
          pls = {orders}
        />
        <div class="container">
          <div class="menu-align">
            <Menu items={menuItems} sendOrders = {getOrders}/>
          </div>
          {/* <div class="order-align">
            <OrderPanel/>
          </div> */}
        </div>
    </main>
  );
};

export default Customer;