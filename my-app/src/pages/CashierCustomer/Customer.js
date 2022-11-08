import React, {useState} from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
// import logo from "./logo.JPG";

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
      <section className="menu section">
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
        <Menu items={menuItems} />
      </section>
    </main>
  );
};

export default Customer;