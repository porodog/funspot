import React, { useEffect, useRef } from "react";

const MapSection = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID";
    script.async = true;
    script.onload = () => {
      const { naver } = window;

      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(37.5665, 126.9780), // 중심 위치
        zoom: 14,
      });

      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5665, 126.9780),
        map: map,
      });
    };
    document.body.appendChild(script);
  }, []);

  return <div ref={mapElement} className="w-full h-[400px]"></div>;
};

export default MapSection;
