import React, { useEffect, useState } from "react";
import MapComponent from "../components/map/MapComponent";
import CourseSection from "../components/map/CourseSection";
import BasicLayout from "../../../common/layout/BasicLayout";
import GoBackButton from "../../../common/hook/useBackbutton";


const App = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // API 호출
    fetch("http://localhost:8080/api/usr/course/datecourses")
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data); // API에서 가져온 데이터 저장
      })
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);

  return (

    <BasicLayout>
      <GoBackButton />
      {/* 네이버 지도 */}
      <MapComponent places={places} />
      {/* 장소 카드 리스트 */}
      <CourseSection courses={places} />
    </BasicLayout>
  );
};

export default App;
