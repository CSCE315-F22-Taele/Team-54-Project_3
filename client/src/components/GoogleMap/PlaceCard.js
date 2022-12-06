/**
 * This file describes the cards used to display Chick-Fil-A locations within the user's selected radius.
 * @author Neha Sujith
 */
import React from 'react';
import {useNavigate} from "react-router-dom";

/**
 * Constructs and displays a PlaceCard for each Chick-Fil-A location within the radius chosen by the user. The card shows
 * the store's official name on Google Maps, its address and distance from the user, whether or not it is currently open, and a photo
 * from the store's gallery.
 * @param {*} infokey parameters used to describe the div holding the PlaceCard component 
 * @returns a PlaceCard object for each store location within the user-selected radius
 */
const PlaceCard = (({ info, key }) => {
  let navigate = useNavigate()

  /**
   * Navigates to a chosen page, called when a button or link is clicked
   * @param {String} page the page route to navigate to.
   */
  const handleUpdate = (page) => {
      navigate(`/${page}`);
  };

  const { address, distanceText, name, openNow, photoUrl } = info;
  
  return (
    <div key={key} className="col-3 w-100 mx-4 my-4">
      <img src={photoUrl} className="image-wrapper-sm mb-2" alt="chicken-hehe" />
      <div className="card">
        <div className="card-body">
          <button onClick={() => handleUpdate("Customer")} type="button" className="btn btn-outline-danger btn-block">{name}</button>
          <span className="d-block mb-1">{address}</span>
          <span className="d-block">{distanceText}</span>
        </div>
        <ul className="list-group list-group-flush">
          {openNow ?
            <li className="list-group-item">Open</li>
            :
            <li className="list-group-item">Closed</li>
          }
        </ul>
      </div>
    </div>
  );
});

export default PlaceCard;