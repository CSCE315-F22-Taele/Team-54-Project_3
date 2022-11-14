import React from 'react';
import { Slider } from 'antd';
import 'antd/dist/antd.css';

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