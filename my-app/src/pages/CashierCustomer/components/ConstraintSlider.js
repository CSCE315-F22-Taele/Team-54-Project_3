import React from 'react';
// import {Slider } from 'antd';
// import RangeSlider from 'react-bootstrap-range-slider';
import { CarFront } from 'react-bootstrap-icons';

const ConstraintSlider = (({ value, onChange, text }) => {
  return (
    <section className="d-flex flex-column" >
        <div className="d-flex w-100 align-items-center">
            <CarFront color="black"/>
            {/* <RangeSlider className="w-100" value={value} min={0} max={60} onChange={onChange} /> */}
            <label htmlFor="customRange2" className="form-label">Enter minutes</label>
            <input type="range" className="form-range" min={0} max={60} id="customRange2" onChange={onChange}></input>
        </div>
        <span className="text-center">{text}</span>
    </section >
  );
});

export default ConstraintSlider;