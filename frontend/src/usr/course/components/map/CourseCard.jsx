import React from "react";

const CourseCard = ({ index, name, title, description, cost, time, latitude, longitude }) => {
  // 네이버 지도 길찾기 링크 생성
  const handleDirections = () => {
    const currentLat = 37.5665; // 출발지: 예시로 서울시청 위도
    const currentLng = 126.9780; // 출발지: 예시로 서울시청 경도
    const url = `https://map.naver.com/v5/directions/${currentLat},${currentLng}/${latitude},${longitude}`;
    window.open(url, "_blank"); // 새 탭으로 열기
  };

  return (
    <div className="relative w-[250px] mt-6 rounded-lg shadow-lg overflow-hidden bg-white">
      {/* 이미지 */}
      <div className="relative">
        <img
          src="https://via.placeholder.com/250x150" // 실제 이미지 URL로 교체
          alt="Course"
          className="w-full h-[150px] object-cover"
        />
        {/* 상단 태그 */}
        <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
          {name}
        </div>
        {/* 순번 */}
        <div className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-teal-400 text-white font-bold text-sm rounded-full shadow-md">
          {index}
        </div>
      </div>

      {/* 카드 내용 */}
      <div className="p-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
        <div className="flex justify-between items-center mt-3 text-sm">
          <div>
            <p className="text-gray-500">1인 예상 비용</p>
            <p className="font-bold">{cost}</p>
          </div>
          <div>
            <p className="text-gray-500">소요시간</p>
            <p className="font-bold">{time}</p>
          </div>
        </div>
      </div>

      {/* 길찾기 버튼 */}
      <button
        onClick={handleDirections}
        className="absolute top-2/3 right-4 px-4 py-2 bg-blue-500 text-white text-sm rounded-full shadow-md hover:bg-blue-600 transition"
      >
        길찾기
      </button>
    </div>
  );
};

export default CourseCard;
