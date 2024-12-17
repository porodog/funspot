import { useState } from "react";
import { API_BASE_URL } from "../../api/FeedApi";
import initSrc from "../../../../common/img/FunSpot.png";

const ImageComponent = ({ openDetailModal, feedImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이미지 슬라이드
  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + feedImages.length) % feedImages.length
    );
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % feedImages.length);
  };

  return (
    <>
      <div className="w-full h-full mx-auto relative overflow-hidden group bg-gray-50">
        {/* 이미지 슬라이드 */}
        <div
          className={`w-full h-full flex transition-transform duration-500
                      ${openDetailModal ? "cursor-pointer" : ""}`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // 인덱스에 맞게 슬라이드 이동
          }}
          onClick={openDetailModal}
        >
          {feedImages.length > 0 ? (
            feedImages.map((image) => (
              <img
                key={image.idx}
                src={`${API_BASE_URL}/api/usr/feed/image/${image.uploadName}`}
                alt={image.originName}
                className="w-full h-full object-contain shrink-0"
              />
            ))
          ) : (
            <img
              src={initSrc}
              alt="펀스팟 이미지"
              className="w-full h-full object-contain shrink-0"
            />
          )}
        </div>

        {/* 슬라이드 버튼 */}
        {feedImages.length > 1 && (
          <>
            <div className="absolute top-1/2 left-5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prevImage}
                className="bg-emerald-400 text-white font-thin px-3 py-2 
                rounded-full hover:bg-emerald-500"
              >
                &lt;
              </button>
            </div>
            <div className="absolute top-1/2 right-5 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={nextImage}
                className="bg-emerald-400 text-white font-thin px-3 py-2 
                rounded-full hover:bg-emerald-500"
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ImageComponent;
