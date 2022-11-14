import React from 'react';
import {useNavigate} from "react-router-dom";

const PlaceCard = (({ info, key }) => {
  let navigate = useNavigate()

    const handleUpdate = (page) => {
        navigate(`/${page}`);
  };

  const { address, distanceText, name, openNow, photoUrl } = info;
  return (
    <div key={key} className="col-3 w-100 mx-4 my-4">
      <img src={photoUrl} className="image-wrapper-sm mb-2" alt="chicken-hehe" />
      <div className="card">
        <div className="card-body">
          <button onClick={() => handleUpdate("Customer")} type="button" class="btn btn-outline-danger btn-block">{name}</button>
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