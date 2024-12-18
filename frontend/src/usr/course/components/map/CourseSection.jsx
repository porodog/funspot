import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import axios from "axios";

const CourseSection = () => {
  const [courses, setCourses] = useState([]); // 코스 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/usr/course/datecourses");
        console.log("API 응답:", response.data); // API 데이터 확인
        setCourses(response.data.data || response.data || []); // 데이터 설정
      } catch (err) {
        console.error("코스 데이터 불러오기 실패:", err);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex gap-4 overflow-x-auto">
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((course) => (
          <CourseCard
            key={course.id}
            index={course.id}
            title={course.title}
            description={course.description}
            cost={course.cost}
            time={course.time}
            latitude={course.latitude}
            longitude={course.longitude}
          />
        ))
      ) : (
        <p>코스를 불러올 수 없습니다.</p>
      )}
    </div>
  );
};

export default CourseSection;
