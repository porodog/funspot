import LeftSideComponent from "../component/list/left/LeftSideComponent";
import RightSideComponent from "../component/list/right/RightSideComponent";

import initSrc from "../../../common/img/image_upload.jpg";
import { useState } from "react";

let id = 0;
const getId = () => {
  return id++;
};

const initList = [];

const sampleList = [
  {
    id: getId(),
    name: `펀스팟 명소입니다_ ${id}`,
    bookmark: true,
    imageList: [initSrc, initSrc, initSrc, initSrc],
  },
  {
    id: getId(),
    name: `펀스팟 명소입니다_ ${id}`,
    bookmark: false,
    imageList: [initSrc, initSrc, initSrc],
  },
  {
    id: getId(),
    name: `펀스팟 명소입니다_ ${id}`,
    bookmark: false,
    imageList: [initSrc, initSrc],
  },
  {
    id: getId(),
    name: `펀스팟 명소입니다_ ${id}`,
    bookmark: false,
    imageList: [],
  },
];

const ListPage = () => {
  // 관광지 목록
  const [spotList, setSpotList] = useState(initList);
  const handleSpotSearchEvent = (param) => {
    console.log(param);
    setSpotList(sampleList);
  };

  return (
    <div className="w-full h-[775px] flex justify-start">
      {/* 좌측영역 - 검색, 목록 */}
      <LeftSideComponent
        spotList={spotList}
        handleSpotSearchEvent={handleSpotSearchEvent}
      />

      {/* 우측영역 - 지도 */}
      <RightSideComponent />
    </div>
  );
};

export default ListPage;
