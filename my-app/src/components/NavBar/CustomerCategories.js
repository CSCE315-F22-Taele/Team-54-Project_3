import React from "react";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import { ArrowReturnLeft, GeoAltFill } from 'react-bootstrap-icons';

const Categories = ({ categories, filterItems, activeCategory }) => {
  let navigate = useNavigate()

  const handleUpdate = (page) => {
      navigate(`/${page}`);
  };
  return (
    <div className="btn-container">
      <button onClick={() => handleUpdate("")} type="button" class="btn btn-outline-secondary"><ArrowReturnLeft color="black"/></button>
      <button onClick={() => handleUpdate("MapContainer")} type="button" class="btn btn-outline-secondary"><GeoAltFill color="blue"/></button>
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
    </div>
  );
};

export default Categories;