import { useEffect, useRef } from 'react';

const ItemMapComponent = ({ spotList }) => {
  const mapElement = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 초기 중심 좌표 (대한민국 중심)
    const defaultCenter = new naver.maps.LatLng(36.5, 127.5);

    // 지도 생성
    const map = new naver.maps.Map(mapElement.current, {
      center: defaultCenter,
      zoom: 7,
      minZoom: 6,  // 전국 단위로 축소 제한
      maxZoom: 18, // 상세 단위로 확대 제한
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
      }
    });

    // 기존 마커들 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // 좌표 범위를 저장할 변수들
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    let hasValidCoordinates = false;

    if (spotList && spotList.length > 0) {
      // 마커 생성 및 지도에 표시
      spotList.forEach((spot) => {
        if (spot.mapX && spot.mapY) {
          const lat = parseFloat(spot.mapY);
          const lng = parseFloat(spot.mapX);

          if (!isNaN(lat) && !isNaN(lng)) {
            hasValidCoordinates = true;

            // 좌표 범위 업데이트
            minLat = Math.min(minLat, lat);
            maxLat = Math.max(maxLat, lat);
            minLng = Math.min(minLng, lng);
            maxLng = Math.max(maxLng, lng);

            const position = new naver.maps.LatLng(lat, lng);

            // 마커 생성
            const marker = new naver.maps.Marker({
              position: position,
              map: map,
              title: spot.title,
              animation: naver.maps.Animation.DROP
            });

            // 정보창 생성
            const infoWindow = new naver.maps.InfoWindow({
              content: `
                <div style="padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <h3 style="font-weight: bold; margin-bottom: 5px;">${spot.title}</h3>
                  <p style="font-size: 0.9em; color: #666;">${spot.addr1 || '주소 정보 없음'}</p>
                </div>
              `,
              borderWidth: 0,
              disableAnchor: true,
              backgroundColor: 'transparent'
            });

            // 마커 클릭 이벤트
            naver.maps.Event.addListener(marker, 'click', () => {
              if (infoWindow.getMap()) {
                infoWindow.close();
              } else {
                infoWindow.open(map, marker);
              }
            });

            markersRef.current.push(marker);
          }
        }
      });

      // 유효한 좌표가 있는 경우 지도 영역 조정
      if (hasValidCoordinates) {
        const bounds = new naver.maps.LatLngBounds(
            new naver.maps.LatLng(minLat, minLng),
            new naver.maps.LatLng(maxLat, maxLng)
        );

        map.fitBounds(bounds, {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50
        });
      }
    }

    return () => {
      // 컴포넌트 언마운트 시 마커 제거
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [spotList]);

  return <div ref={mapElement} className="w-full h-full" />;
};

export default ItemMapComponent;