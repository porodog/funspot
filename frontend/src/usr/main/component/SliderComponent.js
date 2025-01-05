import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const API_BASE_URL = process.env.REACT_APP_API_ROOT;
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

const SliderComponent = ({ items }) => {
  const itemsPerSlide = 5; // 한 슬라이드에 표시할 항목 수
  const [currentIndex, setCurrentIndex] = useState(0);

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerSlide, items.length - itemsPerSlide)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/usr/course/datecourses");
        if (Array.isArray(response.data)) {
          setCourse(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setCourse([]);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
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
    <div className="relative group">
      {/* 슬라이드 컨테이너 */}
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${(currentIndex / itemsPerSlide) * 100
              }%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-1/5 flex-shrink-0 p-2 relative "
            >
              {/* 이미지 섹션 */}
              <div className="relative group">
                <img
                  src={item.places && item.places[0]?.image} // places의 첫 번째 이미지 사용
                  alt={item.name}
                  className="w-64 h-[136.45px] rounded-lg object-contain shrink-0"
                  onError={(e) => {
                    e.target.src = "/images/default.jpg"; // 기본 이미지 설정
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50  opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to={`/datecourses/${item.id}`}
                    className=" p-2 rounded-full"
                  >
                    바로가기&gt;
                  </Link>
                </div>
              </div>
              {/* 텍스트 섹션 */}
              <h3 className="mt-2 text-center font-bold text-sm">
                {item.name}
              </h3>
              {/* <p className="text-center text-gray-500">
                {item.cost} | {item.time}
              </p> */}
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      {items.length > itemsPerSlide && (
        <>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevSlide}
              className="bg-emerald-400 text-white font-thin px-3 py-2 rounded-full hover:bg-emerald-500"
            >
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={nextSlide}
              className="bg-emerald-400 text-white font-thin px-3 py-2 rounded-full hover:bg-emerald-500"
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SliderComponent;