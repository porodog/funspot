// 펀 인기 코스
import React, { useEffect, useState } from "react";
import { getCustomPopularList } from "../../custom/api/WishListApi";
//import SliderComponent from './SliderComponent';
import { Link } from "react-router-dom";

const image = "https://via.placeholder.com/150";

// const popularCourses = [
//   { title: '제목을 입력해주세요', image: 'https://via.placeholder.com/150', price: '34,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 2', image: 'https://via.placeholder.com/150', price: '44,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 3', image: 'https://via.placeholder.com/150', price: '54,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 4', image: 'https://via.placeholder.com/150', price: '64,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 5', image: 'https://via.placeholder.com/150', price: '74,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 6', image: 'https://via.placeholder.com/150', price: '84,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 7', image: 'https://via.placeholder.com/150', price: '94,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 8', image: 'https://via.placeholder.com/150', price: '14,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 9', image: 'https://via.placeholder.com/150', price: '24,000원 외', address: '서울시 구로구' },
//   { title: '인기 코스 10', image: 'https://via.placeholder.com/150', price: '4,000원 외', address: '서울시 구로구' },
// ];

const PopularCourses = () => {
  const [customs, setCustoms] = useState([]);
  const [loading, setLoading] = useState(true);

  const itemsPerSlide = 5; // 한 슬라이드에 표시할 이미지 수
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + itemsPerSlide) % customs.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - itemsPerSlide + customs.length) % customs.length
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCustomPopularList();
        const filteredData = data.filter((custom) => custom.delYn === "N"); // ✅ delYn이 N인 것만 남김
        setCustoms(filteredData);
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
    <section className="container mx-auto p-4 font-bold">
      <span className="text-xl font-bold mb-4 text-custom-cyan">Fun</span>
      <span className="text-base pl-1 pr-1">인기코스</span>
      <Link to="/custom" className="text-xl text-gray-400">
        <span className="bg-gray-200 rounded-3xl pl-2 pr-2 pb-1">&gt;</span>
      </Link>
      <div className="relative group">
        {/* 슬라이드 이미지 컨테이너 */}
        <div className="flex overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${
                (currentIndex / itemsPerSlide) * 100
              }%)`,
            }}
          >
            {customs.map((custom, index) => (
              <div
                key={index}
                className="w-full sm:w-1/5 flex-shrink-0 p-2 relative"
              >
                {/* 이미지 영역 */}
                <div className="relative">
                  <img
                    src={image}
                    alt={custom.title}
                    className="w-64 h-auto rounded-lg object-contain shrink-0"
                  />
                  {/* 호버 시 나타나는 바로가기 버튼 */}
                  <Link
                    to={`/custom/read/${custom.cno}`}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
                  >
                    바로가기 &gt;
                  </Link>
                </div>
                <>
                  <h3 className="text-center mt-2">{custom.title}</h3>
                  <div className="flex justify-center ">
                    <span className="text-start text-xs  text-gray-500">
                      {custom.address}
                    </span>
                    {/* 위 수정 해야함 */}
                    {/* <span className="text-end text-sm ">{item.price}{item.time}{item.km}</span> */}
                    <span className=" text-start text-xs text-gray-400">
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
                    </span>
                  </div>
                </>
              </div>
            ))}
          </div>
        </div>

        {customs.length > 1 && (
          <>
            <div className="absolute top-1/2 left-0 transform -translate-y-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prevSlide}
                className="bg-emerald-400 text-white font-thin px-3 py-2 
            rounded-full hover:bg-emerald-500"
              >
                &lt;
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-[100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={nextSlide}
                className="bg-emerald-400 text-white font-thin px-3 py-2 
            rounded-full hover:bg-emerald-500"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
