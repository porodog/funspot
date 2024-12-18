import React, { useState } from 'react';
import axios from 'axios';
import BasicLayout from '../../../common/layout/BasicLayout';
import GoBackButton from '../../../common/hook/useBackbutton';


const AddCoursePage = () => {
  const [newCourse, setNewCourse] = useState({
    name: '',
    location: '',
    description: '',
    ageGroup: '', // 초기값은 빈 문자열로 설정
    fixed: false,
    latitude: 37.5665, // 기본 위도
    longitude: 126.978, // 기본 경도
  });

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    console.log("Adding course:", newCourse); // 로그 추가

    const token = getCookie("access_token"); // 쿠키에서 토큰 가져오기

    try {
      const response = await axios.post('/api/usr/course/addcourse', newCourse, {
        headers: {
          Authorization: `Bearer ${token}`, // 쿠키에서 가져온 토큰 사용
        },
      });
      alert('새로운 코스가 추가되었습니다!');
      window.location.href = '/datecourses'; // 코스 목록 페이지로 리디렉션
    } catch (error) {
      console.error('Error adding course:', error);
      alert('코스를 추가하는 데 문제가 발생했습니다.');
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <BasicLayout>
      <GoBackButton />
      <div className='text-3xl text-center p-2 m-2 font-bold'>
        <span>코스 추가</span>
      </div>
      <div className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <form onSubmit={handleAddCourse} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold mb-2">코스 이름</label>
            <input
              type="text"
              id="name"
              name="name"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-cyan"
              value={newCourse.name}
              onChange={handleInputChange}
              placeholder="코스 이름을 입력하세요"
              required // 필수 입력 필드
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="location" className="font-bold mb-2">코스 장소</label>
            <input
              type="text"
              id="location"
              name="location"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-cyan"
              value={newCourse.location}
              onChange={handleInputChange}
              placeholder="코스 장소를 입력하세요"
              required // 필수 입력 필드
            />
          </div>

          <div className="font-bold mb-4">
            <label className="block text-lg">대상 나이대</label>
            <div className="flex space-x-4">
              <div>
                <input
                  type="radio"
                  id="ageGroup1"
                  name="ageGroup"
                  value="10대"
                  checked={newCourse.ageGroup === "10대"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="ageGroup1">10대</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ageGroup2"
                  name="ageGroup"
                  value="20대"
                  checked={newCourse.ageGroup === "20대"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="ageGroup2">20대</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ageGroup3"
                  name="ageGroup"
                  value="30대"
                  checked={newCourse.ageGroup === "30대"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <label htmlFor="ageGroup3">30대</label>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="font-bold mb-2">코스 설명</label>
            <textarea
              id="description"
              name="description"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-cyan resize-none"
              value={newCourse.description}
              onChange={handleInputChange}
              placeholder="코스 설명을 입력하세요"
              maxLength="1000" // 1000자 제한
              rows="6" // 고정된 높이 설정 (줄 수를 지정)
              required // 필수 입력 필드
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="fixed"
              name="fixed"
              className="h-5 w-5"
              checked={newCourse.fixed}
              onChange={handleInputChange}
            />
            <label htmlFor="fixed" className="font-bold">코스 고정 여부</label>
          </div>

          <button
            type="submit"
            className="w-full bg-custom-cyan text-white p-3 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            코스 추가
          </button>
        </form>
      </div>
    </BasicLayout>
  );
};

export default AddCoursePage;
