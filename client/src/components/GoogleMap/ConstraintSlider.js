/**
 * This file defines the component used with the Google Maps API to provide a radius constraint for restaurant locations
 * relative to the inputted location.
 * @author Neha Sujith
 */
import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.min.css';

/**
 * Creates a slider component that allows the user to choose a radius in miles around their inputted location in which to look
 * for Chick-Fil-A stores
 * @param {Integer} value the user's desired radius in miles
 * @param {*} onChange triggers the slider to change its displayed value upon interaction
 * @returns a slider component that allows the user to choose a radius around their location in which to look for store locations.
 */
const ConstraintSlider = (({value, onChange}) => {
  return (
    < section className="d-flex flex-column" >
      <div className="d-flex w-100 align-items-center">
        <h6>Enter distance in mi: &nbsp; &nbsp;</h6>
        <Slider className="w-100" value={value} min={0} max={60} onChange={onChange} />
      </div>
    </section >
  );
});

export default ConstraintSlider;