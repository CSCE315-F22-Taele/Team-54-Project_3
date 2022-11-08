import React, {useState} from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

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
      <section className="menu section">
        <div className="title">
          <br></br>
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

export default Cashier;