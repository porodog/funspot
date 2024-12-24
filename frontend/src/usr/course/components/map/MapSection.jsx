import React, { useEffect, useRef } from "react";

const MapSection = ({ places }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const scriptSrc = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6v5g0a8cnc";
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapElement.current || !places || places.length === 0) return;

      const { naver } = window;

      // 지도 초기화
      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(places[0]?.latitude, places[0]?.longitude),
        zoom: 14,
      });

      // 마커 추가
      const pathCoords = places.map((place) => {
        const position = new naver.maps.LatLng(place.latitude, place.longitude);
        new naver.maps.Marker({
          position,
          map,
          title: place.name,
        });
        return position; // Polyline에 사용할 좌표 추가
      });

      // 경로 그리기
      if (pathCoords.length > 1) {
        new naver.maps.Polyline({
          map,
          path: pathCoords, // 좌표 배열로 경로 설정
          strokeColor: "#1E90FF", // 경로 색상
          strokeWeight: 4, // 경로 두께
          strokeOpacity: 0.8, // 경로 투명도
          strokeStyle: "solid", // 경로 스타일
        });
      }
    }
  }, [places]);

  return <div ref={mapElement} className="w-full h-full"></div>;
};

export default MapSection;
