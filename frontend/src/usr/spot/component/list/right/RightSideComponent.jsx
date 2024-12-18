import { useEffect } from "react";
import ItemButtonComponent from "../right/item/ItemButtonComponent";
import ItemMapComponent from "./item/ItemMapComponent";

import initSrc from "../../../../../common/img/image_upload.jpg";
let id = 0;
const getId = () => {
  return id + 1;
};

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

const RightSideComponent = ({ searchParameter, setSpotList }) => {
  // 검색 파라미터 처리
  useEffect(() => {
    // 지도에서 목록을 가져옴 (임시)
    if (Object.keys(searchParameter).length > 0) {
      setSpotList(sampleList);
    }
  }, [searchParameter]);

  return (
    <div className="w-4/6 h-full flex">
      <div className="w-full h-full relative">
        {/* 지도 */}
        <ItemMapComponent />

        {/* 버튼 (코스저장) */}
        <ItemButtonComponent />
      </div>
    </div>
  );
};

export default RightSideComponent;
