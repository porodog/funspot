import React, { useRef } from "react";
import MapSection from "./MapSection";

const MapComponent = () => {
  const mapElement = useRef(null);



  return (
    <MapSection>
      <div ref={mapElement} className="w-full h-[400px]"></div>;
    </MapSection>
  )
};

export default MapComponent;
