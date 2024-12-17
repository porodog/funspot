import React from "react";
import { API_BASE_URL } from "../../api/MypageApi";
import initSrc from "../../../../common/img/FunSpot.png";
import { FaPlus } from "react-icons/fa";

const ImageComponent = ({ feed, openDetailModal }) => {
  return (
    <div
      key={feed.idx}
      className="relative w-full h-80 group 
            bg-gray-50
            transition-shadow duration-300"
    >
      <img
        src={
          (feed.feedImages ?? []).length > 0
            ? `${API_BASE_URL}/api/usr/feed/image/s_${feed.feedImages[0].uploadName}`
            : initSrc
        }
        alt="업로드 이미지"
        className="w-full h-full object-contain"
      />

      <div
        className="absolute inset-0 flex justify-center items-center opacity-0 
            group-hover:opacity-100 transition-opacity duration-300 bg-gray-500 bg-opacity-30 z-10 
            cursor-pointer"
        onClick={() => openDetailModal(`${feed.idx}`)}
      >
        <div className="text-white flex items-center">
          <FaPlus size="1.2rem" />
        </div>
      </div>

      <div
        className="absolute inset-0 
              group-hover:shadow-lg group-hover:shadow-gray-200 
              transition-shadow duration-300"
      ></div>
    </div>
  );
};

export default ImageComponent;
