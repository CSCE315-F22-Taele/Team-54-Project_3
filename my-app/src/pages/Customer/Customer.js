import React, {useState} from "react";
import Menu from "../../components/Cards/Menu";
import Categories from "../../components/NavBar/CustomerCategories";
import items from "../../components/Cards/menuData";
import OrderPanel from "../../components/Panel/OrderPanel";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];

const Customer = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "All Items") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
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
        />
        <div class="container">
          <div class="menu-align">
            <Menu items={menuItems} />
          </div>
          <div class="order-align">
            <OrderPanel/>
          </div>
        </div>
    </main>
  );
};

export default Customer;