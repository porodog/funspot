import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.5665, // 기본 중심 좌표 (서울)
  lng: 126.9780
};

const MapComponent = ({ course }) => {
  const location = course.location.split(',').map(coord => parseFloat(coord));

  return (
    <LoadScript googleMapsApiKey="AIzaSyCKsfHJ8PEog2efxCLXyeeYSaHHXK--40A">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: location[0], lng: location[1] }}
        zoom={10}
      >
        <Marker position={{ lat: location[0], lng: location[1] }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
