import React from "react";
import { useEffect } from "react";
import {Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft, GeoAltFill } from 'react-bootstrap-icons';
import Cart from "../Cards/CartCashier";

const Categories = ({ categories, filterItems, activeCategory, pls }) => {
  let navigate = useNavigate()  

  const handleUpdate = (page) => {
      if (page === "") {
        navigate(`/`);
      } else {
        navigate(`/Customer/${page}`);
      }
  };
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <div className="btn-container">
      <button onClick={() => handleUpdate("")} type="button" className="btn btn-outline-secondary"><ArrowReturnLeft color="black"/></button>
      <button onClick={() => handleUpdate("MapContainer")} type="button" className="btn btn-outline-secondary"><GeoAltFill color="blue"/></button>
      {categories.map((category, index) => {
        return (
          <Button
          variant="outline-danger"
          type="button" 
            className={`${
              activeCategory === category ? "filter-btn-active" : "filter-btn"
            }`}
            key={index}
            onClick={() => filterItems(category)}
          >
            {category}
          </Button>
        );
      })}
      <Cart mapOrders={pls}/>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default Categories;