import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MapSection from "../components/map/MapSection";
import BasicLayout from "../../../common/layout/BasicLayout";
import GoBackButton from "../../../common/hook/useBackbutton";
import CourseSection from "../components/map/CourseSection";

const DateCourseDetailPage = () => {
  const { id } = useParams(); // URL에서 코스 ID 추출
  const [selectedCourse, setSelectedCourse] = useState(null); // 코스 데이터
  const [allPlaces, setAllPlaces] = useState([]); // 전체 장소 데이터
  const [filteredPlaces, setFilteredPlaces] = useState([]); // 선택된 장소
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    // 코스 데이터와 장소 데이터 병렬 요청
    const fetchCourseAndPlaces = async () => {
      try {
        // 코스 데이터 가져오기
        const courseResponse = await fetch(`http://localhost:8080/api/usr/course/${id}`);
        if (!courseResponse.ok) throw new Error(`코스 요청 실패: ${courseResponse.status}`);
        const courseData = await courseResponse.json();

        // 장소 데이터 가져오기
        const placesResponse = await fetch("http://localhost:8080/api/usr/places");
        if (!placesResponse.ok) throw new Error(`장소 요청 실패: ${placesResponse.status}`);
        const placesData = await placesResponse.json();

        // 코스와 연관된 장소 필터링
        const filtered = placesData.filter((place) => {
          if (!Array.isArray(courseData.placeIds)) {
            console.error("placeIds가 배열이 아닙니다:", courseData.placeIds);
            return false;
          }
          // `placeIds` 리스트에서 `place.id`가 포함되어 있는지 확인
          return courseData.placeIds.some((id) => id === place.id);
        });

        // 상태 업데이트
        setSelectedCourse(courseData);
        console.log("Course Data:", courseData);

        setAllPlaces(placesData);
        setFilteredPlaces(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchCourseAndPlaces();
  }, [id]);

  if (loading) {
    return (
      <BasicLayout>
        <GoBackButton />
        <p className="text-center text-gray-500">로딩 중입니다...</p>
      </BasicLayout>
    );
  }

  if (error) {
    return (
      <BasicLayout>
        <GoBackButton />
        <p className="text-center text-red-500">{error}</p>
      </BasicLayout>
    );
  }

  if (!selectedCourse || filteredPlaces.length === 0) {
    return (
      <BasicLayout>
        <GoBackButton />
        <p className="text-center text-gray-500">해당 코스를 찾을 수 없습니다.</p>
      </BasicLayout>
    );
  }

  return (
    <BasicLayout>
      <GoBackButton />
      <div className="flex flex-col items-center mt-3">
        {/* 지도 섹션 */}
        <div className="w-full h-[400px] mb-8">
          <MapSection places={filteredPlaces} />
        </div>

        {/* 코스 섹션 */}
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-4">{selectedCourse.name}</h2>
          <p className="text-gray-600 mb-8">{selectedCourse.description}</p>
          <CourseSection places={filteredPlaces} />
        </div>
      </div>
    </BasicLayout>
  );
};

export default DateCourseDetailPage;
