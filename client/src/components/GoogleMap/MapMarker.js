import React from 'react';
import { ArrowDownCircleFill } from 'react-bootstrap-icons';

const MapMarker = (({ name, key }) => {
  return (
    <div key={key}>
        <span className="brand-red">{name}</span>
        <ArrowDownCircleFill/>
    </div>
  );
});

export default MapMarker;