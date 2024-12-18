import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 게시물 ID를 URL에서 추출
import axios from "axios";
import BasicLayout from "../../../common/layout/BasicLayout";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정

const DateCourseDetailPage = () => {
  const { id } = useParams(); // URL 파라미터에서 게시물 ID 추출
  const [course, setCourse] = useState(null); // 코스 상세 정보 상태
  const [map, setMap] = useState(null); // 네이버 지도 객체 상태

  // 게시물 상세 정보 가져오기
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/usr/course/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  // 네이버 지도 초기화
  useEffect(() => {
    if (course && course.location) {
      const { latitude, longitude } = course.location; // 게시물에서 위치 정보 (예: { latitude, longitude })

      // 콘솔 로그로 위치 값 확인
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);

      // 네이버 지도 API가 로드되었는지 확인
      if (window.naver && window.naver.maps) {
        const mapContainer = document.getElementById("map"); // 지도 컨테이너 찾기
        if (mapContainer) {
          const mapOptions = {
            center: new window.naver.maps.LatLng(latitude, longitude), // 중심 위치 설정
            zoom: 14,
          };
          const mapInstance = new window.naver.maps.Map(mapContainer, mapOptions);

          // 마커 추가 (위치를 표시할 마커)
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(latitude, longitude),
            map: mapInstance,
          });

          setMap(mapInstance); // 지도 상태 업데이트
        } else {
          console.error("Map container not found!");
        }
      } else {
        console.error("Naver Maps API not loaded.");
      }
    }
  }, [course]); // course 변경 시에만 실행되도록 설정

  if (!course) return <div>Loading...</div>; // 데이터가 없으면 로딩 화면 표시

  return (
    <BasicLayout>
      <div className="container mx-auto px-4 py-8">
        <h1>코스 상세 정보</h1>
        <p>코스 ID: {id}</p>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.name}</h1>
        <div className="mb-6">
          <p className="text-lg text-gray-600"><strong>연령대:</strong> {course.ageGroup}</p>
          <p className="text-lg text-gray-600"><strong>설명:</strong> {course.description}</p>
        </div>

        {/* 지도 표시 */}
        <div id="map" style={{ width: "100%", height: "400px" }}></div>

        {/* 위치 정보 */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">장소</h2>
          <p className="text-lg text-gray-600">{course.location?.address}</p> {/* 예시: 주소 표시 */}
        </div>
      </div>
    </BasicLayout>
  );
};

export default DateCourseDetailPage;
