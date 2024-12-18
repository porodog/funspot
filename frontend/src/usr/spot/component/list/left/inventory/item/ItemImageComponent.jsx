import { useState } from "react";

const ItemImageComponent = ({ imageList, slideUnit }) => {
  // 현재 이미지의 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 슬라이드 설정
  const listSize = imageList.length;

  // 이미지 슬라이드 이벤트
  const handlePrevImageEvent = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - slideUnit + listSize) % listSize
    );
  };
  const handleNextImageEvent = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slideUnit) % listSize);
  };

  return (
    <div className={`${slideUnit === 2 ? "w-3/5" : "w-11/12"} h-full`}>
      <div className="w-full h-full space-x-0.5 relative flex overflow-hidden">
        {/* 좌측 버튼 */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrevImageEvent}
            className="px-2 absolute top-1/2 left-0 bg-emerald-400 text-white rounded-full 
                      transform -translate-y-1/2 z-10 hover:bg-emerald-500"
          >
            ❮
          </button>
        )}

        {/* 이미지 슬라이드 */}
        <div
          className="flex space-x-1 transition-transform duration-300"
          style={{
            transform: `translateX(-${(currentIndex * 100) / listSize}%)`,
          }}
        >
          {imageList.map((src, index) => (
            <div key={index} className="w-24 h-full flex-shrink-0">
              <img
                src={src}
                alt={`이미지 ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* 우측 버튼 */}
        {currentIndex < listSize - slideUnit && (
          <button
            onClick={handleNextImageEvent}
            className="px-2 absolute top-1/2 right-0 bg-emerald-400 text-white rounded-full 
                      transform -translate-y-1/2 z-10 hover:bg-emerald-500"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemImageComponent;
