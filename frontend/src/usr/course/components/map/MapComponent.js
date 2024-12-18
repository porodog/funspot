import React, { useEffect, useRef } from "react";

const MapComponent = ({ places }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6v5g0a8cnc";
    script.async = true;

    script.onload = () => {
      const { naver } = window;

      // 지도 초기화
      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(37.4979, 127.0276), // 초기 중심 좌표
        zoom: 14,
      });

      const pathCoords = []; // 좌표 배열 생성

      // 마커와 좌표를 생성
      places.forEach((place, index) => {
        const position = new naver.maps.LatLng(place.latitude, place.longitude);
        pathCoords.push(position); // 좌표를 배열에 추가

        // 커스텀 마커 생성
        new naver.maps.Marker({
          position: position,
          map: map,
          icon: {
            content: `
              <div style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background-color: #4DD0E1;
                border-radius: 50%;
                color: white;
                font-weight: bold;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
              ">
                ${index + 1}
              </div>
            `,
            anchor: new naver.maps.Point(20, 20),
          },
        });
      });

      // 폴리라인(경로) 생성
      new naver.maps.Polyline({
        map: map,
        path: pathCoords, // 경로를 좌표 배열로 설정
        strokeColor: "#1E90FF", // 선 색상
        strokeWeight: 4, // 선 두께
        strokeOpacity: 0.8, // 선 투명도
        strokeStyle: "solid", // 선 스타일
      });

      // 지도 중심을 첫 번째 마커로 이동
      if (pathCoords.length > 0) {
        map.setCenter(pathCoords[0]);
      }
    };

    document.body.appendChild(script);
  }, [places]);

  return <div ref={mapElement} className="w-full h-[400px]"></div>;
};

export default MapComponent;
