import React, { useEffect, useRef } from "react";
import restaurant from "../../../custom/img/Restaurant.png"
import cafe from "../../../custom/img/Cafe.png"
import exercise from "../../../custom/img/Exercise.png"
import walk from "../../../custom/img/Walk.png"
import basic from "../../../custom/img/Basic.png"
const MapSection = ({ places }) => {
  const mapElement = useRef(null);

  // useEffect(() => {
  //   const scriptSrc = "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6v5g0a8cnc";
  //   const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.src = scriptSrc;
  //     script.async = true;
  //     script.onload = initializeMap;
  //     document.body.appendChild(script);
  //   } else {
  //     initializeMap();
  //   }

  //   function initializeMap() {
  //     if (!mapElement.current || !places || places.length === 0) return;

  //     const { naver } = window;

  //     // 지도 초기화
  //     const map = new naver.maps.Map(mapElement.current, {
  //       center: new naver.maps.LatLng(places[0]?.latitude, places[0]?.longitude),
  //       zoom: 14,
  //     });

  //     // 마커 추가
  //     const pathCoords = places.map((place) => {
  //       const position = new naver.maps.LatLng(place.latitude, place.longitude);
  //       new naver.maps.Marker({
  //         position,
  //         map,
  //         title: place.name,
  //       });
  //       return position; // Polyline에 사용할 좌표 추가
  //     });

  //     // 경로 그리기
  //     if (i > 0) {
  //       {
  //         new naver.maps.Polyline({
  //           map: map,
  //           path: [pathCoords[i - 1], position],
  //           strokeColor: "#25E2B6", // 선 색상
  //           strokeWeight: 5, // 선 두께
  //           strokeOpacity: 1, // 선 투명도
  //           strokeStyle: "solid",
  //         });
  //       }
  //     }
  //   }
  // }, [places]);

  useEffect(() => {
    if (!mapElement.current || !places || places.length === 0) return;

    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=6v5g0a8cnc";
    script.async = true;

    script.onload = () => {
      const { naver } = window;
      if (!naver) {
        console.error("Naver Map is not loaded.");
        return;
      }

      const map = new naver.maps.Map(mapElement.current, {
        center: new naver.maps.LatLng(
          places[0].latitude,
          places[0].longitude
        ),
        zoom: 14,
      });

      const pathCoords = places.map(
        (place) => new naver.maps.LatLng(place.latitude, place.longitude)
      );

      for (let i = 0; i < pathCoords.length; i++) {
        const position = pathCoords[i];

        const place = places[i];

        const categoryIcons = {
          식당: restaurant,
          카페: cafe,
          체험: exercise,
          명소: walk,
          기본: basic,
        };

        new naver.maps.Marker({
          position: position,
          map: map,
          icon: {
            content: `
              <div style="
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 50px;
                height: 50px;
                background-color: #00E5E5; /* 마커 배경 색상 */
                border-radius: 50% 50% 50% 0; /* 핀 형태 */
                transform: rotate(-45deg);
                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3); /* 그림자 추가 */
              ">
                <!-- 내부 아이콘 -->
                <div style="
                  position: absolute;
                  width: 30px;
                  height: 30px;
                  background-color: #FFFFFF; /* 아이콘 배경색 흰색 */
                  border-radius: 50%; /* 원형 */
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transform: rotate(45deg); /* 회전 복구 */
                ">
                  <img src="${categoryIcons[place.category] || categoryIcons["기본"]
              }" alt="아이콘" style="
                    width: 18px;
                    height: 18px;
                  "/>
                </div>
        
                <!-- 마커 번호 -->
                <div style="
                  position: absolute;
                  top: -12px;
                  left: 4px;
                  width: 20px;
                  height: 20px;
                  background-color: #2C3E50; /* 번호 배경색 */
                  color: white;
                  border-radius: 50%;
                  font-size: 12px;
                  font-weight: bold;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transform: rotate(45deg);
                ">
                  ${i + 1} <!-- 번호 -->
                </div>
              </div>
            `,
            anchor: new naver.maps.Point(25, 60), // 마커 위치 조정
          },
        });

        if (i > 0) {
          new naver.maps.Polyline({
            map: map,
            path: [pathCoords[i - 1], position],
            strokeColor: "#25E2B6", // 선 색상
            strokeWeight: 5, // 선 두께
            strokeOpacity: 1, // 선 투명도
            strokeStyle: "solid",
          });
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [places]);


  return <div ref={mapElement} className="w-full h-full"></div>;
};

export default MapSection;
