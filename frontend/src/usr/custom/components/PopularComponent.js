import React, { useEffect, useState } from "react";
import { getCustomPopularListAll } from "../api/WishListApi";
import { Link } from "react-router-dom";

import locate from "../img/locate.png";

const PopularComponent = () => {
  const [customs, setCustoms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomPopularListAll();
        setCustoms(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(customs);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        유저들의 인기 코스에요
      </h1>
      {customs.length > 0 ? (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-6">
            {customs.map((custom) => (
              <div
                key={custom.cno}
                className="w-full bg-white rounded-lg shadow-md overflow-hidden relative"
              >
                {/* 이미지 영역 */}
                <div className="grid grid-cols-5 gap-1">
                  {custom.places.map((place, index) => (
                    <div
                      key={index}
                      className="relative p-2 bg-white rounded-lg overflow-hidden"
                    >
                      {/* 이미지 */}
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />

                      {/* 좌측 상단 아이콘과 텍스트 */}
                      <div className="absolute top-2 left-2 flex items-center bg-black/60 text-white px-2 py-1 rounded-md">
                        {/* 아이콘 */}
                        <img
                          src={locate} // 아이콘 경로
                          alt="locate"
                          className="w-4 h-4 mr-1"
                        />
                        {/* 텍스트 */}
                        <span className="text-xs">{place.simpleAddress}</span>
                      </div>

                      {/* 번호 */}
                      <div className="absolute bottom-6 left-4 text-white text-xl font-bold bg-black/60 px-1 rounded">
                        {index + 1}
                      </div>

                      {/* 장소 이름 */}
                      <p className="absolute bottom-2 left-4 text-white text-sm font-semibold bg-black/60 px-1 rounded">
                        {place.name}
                      </p>
                    </div>
                  ))}
                  {/* 여백을 유지하기 위해 빈 박스를 추가 */}
                  {Array.from({ length: 5 - custom.places.length }).map(
                    (_, index) => (
                      <div key={`empty-${index}`} className="relative">
                        <div className="w-full h-32 bg-white"></div>
                      </div>
                    )
                  )}
                </div>

                {/* 코스 정보 */}
                <div className="p-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {custom.nickname}님의 {custom.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {custom.places.reduce(
                      (total, place) => total + place.estimatedCost,
                      0
                    )}
                    원 |{" "}
                    {(() => {
                      const totalMinutes = custom.places.reduce(
                        (total, place) => total + place.durationMinutes,
                        0
                      );
                      const hours = Math.floor(totalMinutes / 60);
                      const minutes = totalMinutes % 60;

                      return (
                        <>
                          {hours > 0 && `${hours}시간 `}
                          {minutes > 0 && `${minutes}분`}
                        </>
                      );
                    })()}
                  </p>

                  <div className="flex gap-2 mt-4">
                    {custom.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-custom-cyan text-xs font-semibold border border-custom-cyan rounded-full px-2 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/*하단 버튼 */}
                <div className="absolute bottom-2 right-2">
                  <Link
                    to={`/custom/read/${custom.cno}`}
                    className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition inline-block"
                  >
                    자세히 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          등록된 데이트 코스가 없습니다.
        </p>
      )}
    </div>
  );
};

export default PopularComponent;
