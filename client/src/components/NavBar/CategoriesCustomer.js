/**
 * This file describes the functionality for a navigation bar in the Customer user that allows the user to filter menu items
 * by category to view. The navigation bar also contains a button to access the Google Maps API, a button to view the order
 * proceed to checkout, and a back button.
 * @author Neha Sujith
 */
import React from "react";
import { useEffect } from "react";
import {Button} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft, GeoAltFill } from 'react-bootstrap-icons';
import Cart from "../Cards/CartCustomer";

/**
 * Constructs and displays a navigation bar of menu categories in order to view the store menu by category for the Customer user.
 * @param {Array} categories a list of menu categories
 * @param {*} filterItems the menu items to display for a selected category
 * @param {String} activeCategory the category in the navigation bar currently selected by the user
 * @param {Array} pls an array of items in the current order to pass to the Cart object
 * @returns a navigation bar for menu categories
 */
const Categories = ({ categories, filterItems, activeCategory, pls }) => {
  let navigate = useNavigate()

  /**
   * Navigates to the desired page, triggerd by a button click
   * @param {String} page The page to navigate to
   */
  const handleUpdate = (page) => {
      if (page === "") {
        navigate(`/`);
      } else {
        navigate(`/Customer/${page}`);
      }
  };

  /**
   * Initializes the Google Translate widget on the page
   */
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false
      },
      "google_translate_element"
    );
  };

  /**
   * Displayes the Google Translate element with page language set to English as the default
   */
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