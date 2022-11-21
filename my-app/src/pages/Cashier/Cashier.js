import React, {useState} from "react";
import Menu from "../../components/Cards/Menu";
import Categories from "../../components/NavBar/CashierCategories";
import items from "../../components/Cards/menuData";
import OrderPanel from "../../components/Panel/OrderPanel";

const allCategories = ["All Items", "Breakfast", "Entree", "Salads", "Sides", "Kids Meals", "Treats", "Drinks", "Sauce"];

const Cashier = () => {
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
          <br></br>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
        />
        <div clasNames="container">
          <div className="menu-align">
            <Menu items={menuItems} />
          </div>
          <div className="order-align">
            <OrderPanel/>
          </div>
        </div>
    </main>
  );
};

export default Cashier;