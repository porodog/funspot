import React from "react";
import { API_BASE_URL } from "../../api/MypageApi";
import initSrc from "../../../../common/img/FunSpot.png";
import ButtonComponent from "./ButtonComponent";
import { useParams } from "react-router-dom";
import { useBasic } from "../../../../common/context/BasicContext";

const ImageComponent = ({
  feed,
  openDetailModal,
  openModifyModal,
  handleListDeleteEvent,
}) => {
  const { userIdx } = useParams();
  const { userInfo } = useBasic();
  const loginUserIdx = userInfo?.userIdx || "";

  return (
    <div
      key={feed.idx}
      className="relative w-full max-h-80 group 
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

      <ButtonComponent
        userIdx={userIdx}
        loginUserIdx={loginUserIdx}
        feedIdx={feed.idx}
        openDetailModal={openDetailModal}
        openModifyModal={openModifyModal}
        handleListDeleteEvent={handleListDeleteEvent}
      />

      <div
        className="absolute inset-0 
              group-hover:shadow-lg group-hover:shadow-gray-200 
              transition-shadow duration-300"
      ></div>
    </div>
  );
};

export default ImageComponent;
