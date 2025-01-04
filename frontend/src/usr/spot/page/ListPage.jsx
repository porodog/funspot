import LeftSideComponent from "../component/list/left/LeftSideComponent";
import RightSideComponent from "../component/list/right/RightSideComponent";
import { useState } from "react";
import CenterSideComponent from "../component/list/center/CenterSideComponent";

const ListPage = () => {
  // 검색 파라미터
  const [searchParameter, setSearchParameter] = useState({});

  // 관광지 목록
  const [spotList, setSpotList] = useState([]);

  // 관광지 상세
  const [spotSelected, setSpotSelected] = useState({});

  return (
    <div className="w-full h-[735px] flex justify-start">
      {/* 좌측영역 - 검색, 목록 */}
      <LeftSideComponent
        spotList={spotList}
        setSpotList={setSpotList}   // 추가
        setSearchParameter={setSearchParameter}
        setSpotSelected={setSpotSelected}
      />

      {/* 중간영역 - 상세정보 */}
      {Object.keys(spotSelected).length > 0 && (
        <CenterSideComponent
          spotSelected={spotSelected}
          setSpotSelected={setSpotSelected}
        />
      )}

      {/* 우측영역 - 지도 */}
      <RightSideComponent
          spotList={spotList}
          searchParameter={searchParameter}
      />
    </div>
  );
};

export default ListPage;
