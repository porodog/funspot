import React from "react";
import ItemButtonComponent from "../right/item/ItemButtonComponent";

const RightSideComponent = () => {
  return (
    <div className="w-4/6 h-full bg-gray-100 flex">
      <div className="w-full h-full relative">
        지도 영역
        <ItemButtonComponent />
      </div>
    </div>
  );
};

export default RightSideComponent;
