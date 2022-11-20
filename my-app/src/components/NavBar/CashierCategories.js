import React from "react";
import { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

const Categories = ({ categories, filterItems, activeCategory }) => {
  let navigate = useNavigate()

  const handleUpdate = (page) => {
      navigate(`/${page}`);
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
      <button onClick={() => handleUpdate("")} type="button" class="btn btn-outline-secondary"><ArrowReturnLeft color="black"/></button>
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
      <div id="google_translate_element"></div>
    </div>
  );
};

export default Categories;