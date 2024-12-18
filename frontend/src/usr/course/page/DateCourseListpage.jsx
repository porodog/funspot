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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [ageGroupFilter, setAgeGroupFilter] = useState(""); // 연령대 필터 상태
  const [locationFilter, setLocationFilter] = useState(""); // 지역 필터 상태
  const navigate = useNavigate();

  // 로그인 상태 확인 및 코스 목록 불러오기
  useEffect(() => {
    const verifyLoginStatus = () => {
      if (userInfo?.token) {
        setIsLoggedIn(true); // 로그인 상태 업데이트
        fetchCourses(userInfo.token); // 로그인 상태에서 코스 목록 가져오기
      } else {
        setIsLoggedIn(false); // 비로그인 상태
        fetchCourses(); // 비로그인 상태에서 코스 목록 가져오기
      }
    };

    verifyLoginStatus();
  }, [userInfo]);

  // 코스 목록 불러오기 함수
  const fetchCourses = async (token) => {
    try {
      let response;

      if (token) {
        response = await axios.get("/api/usr/course/datecourses", {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 포함
          },
        });
      } else {
        response = await axios.get("/api/usr/course/datecourses");
      }

      console.log("Fetched courses: ", response.data); // 데이터 확인
      setDateCourses(response.data); // 코스 목록 상태 업데이트
      setFilteredCourses(response.data); // 필터링된 목록 초기화
    } catch (error) {
      console.error("Error fetching date courses:", error);
    }
  };

  // 필터 적용 함수
  const applyFilters = () => {
    let filtered = datecourses;

    if (ageGroupFilter) {
      filtered = filtered.filter(course => course.ageGroup == ageGroupFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter(course => course.location.includes(locationFilter));
    }

    setFilteredCourses(filtered); // 필터링된 코스 목록 상태 업데이트
  };

  // 새로운 코스 추가 페이지로 이동
  const navigateToAddCoursePage = () => {
    navigate("/addcourse"); // 로그인된 상태면 코스 추가 페이지로 이동
  };

  return (
    <BasicLayout>
      <GoBackButton />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">데이트 코스 목록</h1>

        <div className="mb-8 text-center">
          {userInfo && (
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
            <label htmlFor="ageGroupFilter" className="mr-2">연령대:</label>
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
            <label htmlFor="locationFilter" className="mr-2">지역:</label>
            <select
              id="locationFilter"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border rounded-md px-4 py-2"
            >
              <option value="">전체</option>
              <option value="경기">경기</option>
              <option value="서울">서울</option>
              <option value="대구">대구</option>
            </select>
          </div>
          <button
            onClick={applyFilters}
            className="bg-custom-cyan text-white py-2 px-4 rounded-md hover:bg-emerald-500"
          >
            필터 적용
          </button>
        </div>

        {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">등록된 코스</h2>
            <ul className="space-y-4">
              {filteredCourses.map((course) => (
                <li key={course.id} className="border-b pb-4">
                  {/* <a href={`/datecourses/course/${course.id}`}><h3 className="text-xl font-semibold text-gray-800">{course.name}</h3></a> */}
                  <Link to={`/datecourses/${course.id}`}>{course.name}</Link>
                  <p className="text-gray-700">장소 : {course.location}</p>
                  <p className="text-gray-700">연령대 : {course.ageGroup}</p>
                  <p className="text-gray-600">설명 : {course.description}</p>
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
