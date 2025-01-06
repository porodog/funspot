import React from "react";
// import seoulsta from "./img/서울역.jpg"

const CourseSection = ({ places }) => {
  // 임의의 더미 데이터
  // const dummyPlaces = [
  //   {
  //     id: 1,
  //     name: "서울역",
  //     latitude: 37.5665,
  //     longitude: 126.9780,
  //     cost: 3500,
  //     duration: 40,
  //     image: "https://via.placeholder.com/300x200", // 이미지 URL
  //   },
  //   {
  //     id: 2,
  //     name: "광화문",
  //     latitude: 37.5705,
  //     longitude: 126.9830,
  //     cost: 3500,
  //     duration: 50,
  //     image: "https://via.placeholder.com/300x200",
  //   },
  //   {
  //     id: 3,
  //     name: "경복궁",
  //     latitude: 37.5805,
  //     longitude: 126.9900,
  //     cost: 3500,
  //     duration: 60,
  //     image: "https://via.placeholder.com/300x200",
  //   },
  //   {
  //     id: 4,
  //     name: "한강공원",
  //     latitude: 37.5405,
  //     longitude: 126.9700,
  //     cost: 3500,
  //     duration: 30,
  //     image: "https://via.placeholder.com/300x200",
  //   },
  // ];

  return (
    <div className="flex gap-4 overflow-x-auto">
      {places && places.length > 0 ? (
        places.map((place, index) => (
          <div
            key={place.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative w-[300px]"
          >
            {/* 이미지 */}
            <div className="relative">
              <img
                src={place.image || "https://via.placeholder.com/300x200"}
                alt={place.name}
                className="w-full h-40 object-cover"
              />

              {/* 번호 표시 */}
              <div className="absolute top-2 left-2 bg-custom-cyan text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {index + 1}
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{place.name}</h3>
              <p className="text-gray-600">1인 예상 비용: {place.cost}</p>
              <p className="text-gray-600">소요 시간: {place.time}</p>

              {/* 길찾기 버튼 */}
              <button
                onClick={() =>
                  window.open(
                    `https://map.kakao.com/link/to/${encodeURIComponent(
                      place.name
                    )},${place.latitude},${place.longitude}`
                  )
                }
                className="mt-4 w-full py-2 bg-custom-cyan text-white rounded-lg hover:bg-emerald-600 transition"
              >
                길찾기
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>표시할 장소가 없습니다.</p>
      )}
    </div>
  );
};

export default CourseSection;
