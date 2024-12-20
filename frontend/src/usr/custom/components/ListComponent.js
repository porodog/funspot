import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomList } from "../api/CustomApi";
import { Link } from "react-router-dom";
import Place from "../img/Place.png";

const ListComponent = () => {
  const [customs, setCustoms] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomList();
        setCustoms(data);
      } catch (error) {
        console.error("Failed to fetch custom list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        유저들이 만든 코스에요
      </h1>
      <button
        onClick={() => navigate("/custom/add")}
        className="w-full bg-custom-cyan text-white py-2 px-4 rounded-md hover:bg-emerald-500 transition duration-200 cursor-pointer"
      >
        코스 만들기
      </button>

      {customs.length > 0 ? (
        <div className="p-4">
          <div className="grid grid-cols-1 gap-6">
            {customs.map((custom) => (
              <div className="w-full bg-white rounded-lg shadow-md overflow-hidden relative">
                {/* 이미지 영역 */}
                <div className="grid grid-cols-5 gap-1">
                  {custom.places.map((place, index) => (
                    <div
                      key={index}
                      className="relative p-2 bg-white rounded-lg overflow-hidden"
                    >
                      <img
                        src={Place}
                        alt={place.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-6 left-4 text-white text-xl font-bold">
                        {index + 1}
                      </div>
                      <p className="absolute bottom-2 left-4 text-white text-sm font-semibold">
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
                    {custom.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {custom.places.reduce(
                      (total, place) => total + place.estimatedCost,
                      0
                    )}
                    원 |{" "}
                    {custom.places.reduce(
                      (total, place) =>
                        Math.floor(total + place.durationMinutes / 60),
                      0
                    ) > 0 &&
                      `${custom.places.reduce(
                        (total, place) =>
                          Math.floor(total + place.durationMinutes / 60),
                        0
                      )}시간`}
                    {custom.places.reduce(
                      (total, place) => total + (place.durationMinutes % 60),
                      0
                    ) > 0 &&
                      `${custom.places.reduce(
                        (total, place) => total + (place.durationMinutes % 60),
                        0
                      )}분`}
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

export default ListComponent;
