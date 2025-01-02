import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // URL에서 courseId 추출
import BasicLayout from "../../../common/layout/BasicLayout";
import GoBackButton from "../../../common/hook/useBackbutton";
import MapSection from "../components/map/MapSection";
import CourseSection from "../components/map/CourseSection";
import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const DateCourseDetailPage = () => {
  const { id } = useParams(); // URL에서 courseId 가져오기
  const [course, setCourse] = useState(null); // 코스 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 코스 데이터를 받아오는 함수
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/usr/course/datecourses/${id}`);
        setCourse(response.data); // 코스 데이터를 상태에 저장
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  // 로딩 상태 처리
  if (loading) {
    return (
      <BasicLayout>
        <GoBackButton />
        <p className="text-center text-gray-500">로딩 중입니다...</p>
      </BasicLayout>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <BasicLayout>
        <GoBackButton />
        <p className="text-center text-red-500">{error}</p>
      </BasicLayout>
    );
  }

  // 코스 데이터가 없는 경우
  if (!course) {
    return (
      <BasicLayout>
        <GoBackButton />
        <p className="text-center text-gray-500">해당 코스를 찾을 수 없습니다.</p>
      </BasicLayout>
    );
  }

  // 렌더링
  return (
    <BasicLayout>
      <GoBackButton />
      <div className="flex flex-col items-center mt-3">
        {/* 지도 섹션 */}
        <div className="w-full h-[400px] mb-8">
          {course.places && course.places.length > 0 ? (
            <MapSection places={course.places} />
          ) : (
            <p className="text-gray-500">장소 데이터를 불러올 수 없습니다.</p>
          )}
        </div>

        {/* 코스 섹션 */}
        <div className="w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold mb-4">{course.name}</h2>
          <p className="text-gray-600 mb-8">{course.description}</p>
          {course.places && course.places.length > 0 ? (
            <CourseSection places={course.places} />
          ) : (
            <p className="text-gray-500">장소 데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </BasicLayout>
  );
};

export default DateCourseDetailPage;
