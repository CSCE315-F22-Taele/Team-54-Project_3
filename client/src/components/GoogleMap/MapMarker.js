/**
 * This file creates and displays the marker on the Google Maps display showing a selected location.
 * @author Neha Sujith
 */
import React from 'react';
import { ArrowDownCircleFill } from 'react-bootstrap-icons';

/**
 * Constructs and displays a marker on Google Maps at the user's selected location.
 * @param {Array} namekey the name and key used to create the div holding the Map Marker 
 * @returns a MapMarker object showing the user's selected location.
 */
const MapMarker = (({ name, key }) => {
  return (
    <div key={key}>
        <span className="brand-red">{name}</span>
        <ArrowDownCircleFill/>
    </div>
  );
});

export default MapMarker;