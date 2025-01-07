import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useBasic } from "../../../common/context/BasicContext"; // 경로에 맞게 수정
import BasicLayout from "../../../common/layout/BasicLayout";
import GoBackButton from "../../../common/hook/useBackbutton";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true; // 쿠키사용여부 설정

const DateCourseListPage = () => {
  const { userInfo } = useBasic(); // Context에서 값 가져오기
  const [datecourses, setDateCourses] = useState([]); // 코스 목록 상태
  const [filteredCourses, setFilteredCourses] = useState([]); // 필터링된 코스 목록
  const [places, setPlaces] = useState([]); // 장소 데이터 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [ageGroupFilter, setAgeGroupFilter] = useState(""); // 연령대 필터 상태
  const [locationFilter, setLocationFilter] = useState(""); // 지역 필터 상태
  const navigate = useNavigate();

  const userRole = userInfo?.role?.toUpperCase() || ""; // Context에서 userRole 가져오기

  // 로그인 상태 확인 및 코스 목록 불러오기
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // 코스 데이터 가져오기
        const courseResponse = await axios.get("/api/usr/course/datecourses", {
          headers: {
            Authorization: `Bearer ${userInfo?.token || ""}`,
          },
        });
        setDateCourses(courseResponse.data);

        // 장소 데이터 가져오기
        const placesResponse = await axios.get("/api/usr/course/places", {
          headers: {
            Authorization: `Bearer ${userInfo?.token || ""}`,
          },
        });
        setPlaces(placesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, [userInfo]);

  // 필터링 로직
  useEffect(() => {
    let filtered = datecourses;

    // 연령대 필터
    if (ageGroupFilter) {
      filtered = filtered.filter((course) => course.ageGroup === ageGroupFilter);
    }

    // 장소 필터
    if (locationFilter) {
      filtered = filtered.filter((course) =>
          course.places?.some((place) => place.location.includes(locationFilter))
      );
    }

    setFilteredCourses(filtered);
  }, [datecourses, ageGroupFilter, locationFilter]);

  const navigateToAddCoursePage = () => {
    if (userRole !== "ROLE_ADMIN") {
      alert("관리자 권한이 필요합니다.");
      return;
    }
    navigate("/addcourse");
  };

  return (
      <BasicLayout>
        <GoBackButton />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">데이트 코스 목록</h1>

          <div className="mb-8 text-center">
            {userRole === "ROLE_ADMIN" && (
                <button
                    onClick={navigateToAddCoursePage}
                    className="w-full bg-custom-cyan text-white py-2 px-4 rounded-md hover:bg-emerald-500 transition duration-200 cursor-pointer"
                >
                  새로운 코스 추가
                </button>
            )}
          </div>

          {/* 필터 UI 추가 */}
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <label htmlFor="ageGroupFilter" className="mr-2">
                연령대:
              </label>
              <select
                  id="ageGroupFilter"
                  value={ageGroupFilter}
                  onChange={(e) => setAgeGroupFilter(e.target.value)}
                  className="border rounded-md px-4 py-2"
              >
                <option value="">전체</option>
                <option value="10대">10대</option>
                <option value="20대">20대</option>
                <option value="30대">30대</option>
              </select>
            </div>
            <div className="flex items-center">
              <label htmlFor="locationFilter" className="mr-2">
                지역:
              </label>
              <select
                  id="locationFilter"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="border rounded-md px-4 py-2"
              >
                <option value="">전체</option>
                <option value="경기">경기</option>
                <option value="서울">서울</option>
                <option value="부산">부산</option>
                <option value="제주">제주</option>
              </select>
            </div>
          </div>

          {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">등록된 코스</h2>
                <ul className="space-y-4">
                  {filteredCourses.map((course) => (
                      <li key={course.id} className="border-b pb-4">
                        <Link to={`/datecourses/${course.id}`}>{course.name}</Link>
                        <p className="text-gray-600">설명 : {course.description}</p>
                        <p className="text-gray-700">연령대 : {course.ageGroup}</p>
                        <p className="text-gray-600">
                          장소 : {course.places?.[0]?.location || "정보 없음"}
                        </p>
                        <p className="text-gray-500">{course.fixed ? "고정된 코스" : "변동 가능한 코스"}</p>
                      </li>
                  ))}
                </ul>
              </div>
          ) : (
              <p className="text-center text-gray-500">등록된 코스가 없습니다.</p>
          )}
        </div>
      </BasicLayout>
  );
};

export default DateCourseListPage;
