import React, {useState, useRef} from "react";
import Menu from "../../components/Cards/MenuCustomer";
import Categories from "../../components/NavBar/CategoriesCustomer";
import items from "../../components/Cards/menuData";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];

const Customer = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);
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
    orders.current = [];
    let temp = Object.assign([], mapOrders);
    temp.forEach(food => {
      orders.current.push(food);
    });
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
        <div className="container">
          <div className="menu-align">
            <Menu items={menuItems} sendOrders = {getOrders}/>
          </div>
          {/* <div className="order-align">
            <OrderPanel/>
          </div> */}
        </div>
    </main>
  );
};

export default Customer;