// import React, {useState} from "react";
// import Menu from "./Menu";
// import Categories from "./Categories";
// import items from "./data";

// const allCategories = ["all", ...new Set(items.map((item) => item.category))];

// const Cashier = () => {
//     const [menuItems, setMenuItems] = useState(items);
//     const [activeCategory, setActiveCategory] = useState("");
//     const [categories, setCategories] = useState(allCategories);

//     const filterItems = (category) => {
//         setActiveCategory(category);

//         if (category === "all") {
//             setMenuItems(items);
//             return;
//         }

//         const newItems = items.filter((item) => item.category === category);
//         setMenuItems(newItems);
//     };
//     return (
//         // <div>
//         //     <h1 className="font-weight-light display-1 text-center">
//         //         Cashier
//         //     </h1>
//         // </div>
//         <main>
//             <section className = "menu section">
//                 <div className = "title">
//                     <h2>Menu List</h2>
                    
//                 </div>
//                 {/* <Categories catgories={categories} activeCategory={activeCategory} filterItems={filterItems} /> */}
                
//             </section>
//         </main>
//     );
// };

// export default Cashier;

import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
// import logo from "./logo.JPG";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

const Cashier = () => {
  const [menuItems, setMenuItems] = useState(items);
  const [activeCategory, setActiveCategory] = useState("");
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) => {
    setActiveCategory(category);
    if (category === "all") {
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
          <h2>Menu List</h2>
          <div className="underline"></div>
        </div>
        <Categories
          categories={categories}
          activeCategory={activeCategory}
          filterItems={filterItems}
        />
        {/* <Menu items={menuItems} /> */}
      </section>
    </main>
  );
};

export default Cashier;