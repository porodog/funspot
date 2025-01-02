import React, { useState } from "react";
import { Link } from "react-router-dom";

const SliderComponent = ({ items }) => {
  const itemsPerSlide = 5; // 한 슬라이드에 표시할 항목 수
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerSlide, items.length - itemsPerSlide)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerSlide, 0));
  };

  return (
    <div className="relative group">
      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            transform: `translateX(-${(currentIndex / itemsPerSlide) * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full sm:w-1/5 flex-shrink-0 p-2 relative"
            >
              {/* 이미지와 상세 정보 */}
              <div className="relative">
                <img
                  src={item.image || "https://via.placeholder.com/150"}
                  alt={item.title || "No Title"}
                  className="w-full h-auto rounded-lg object-contain"
                />
                <Link
                  to={`/datecourses/${item.id}`}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  p-2 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  바로가기 &gt;
                </Link>
              </div>
              <p className="text-center text-sm text-black">
                <h1 className="text-center mt-2 font-bold">{item.name}</h1>

              </p>
            </div>
          ))}
        </div>
      </div>

      {items.length > itemsPerSlide && (
        <>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevSlide}
              className="bg-emerald-400 text-white font-thin px-3 py-2 
      rounded-full hover:bg-emerald-500"
            >
              &lt;
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
  );
};

export default SliderComponent;
