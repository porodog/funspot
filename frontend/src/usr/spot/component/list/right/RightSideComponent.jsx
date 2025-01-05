import ItemButtonComponent from "./item/ItemButtonComponent";
import ItemMapComponent from "./item/ItemMapComponent";

const RightSideComponent = ({ spotList }) => {
  return (
      <div className="w-4/6 h-full flex">
        <div className="w-full h-full relative">
          {/* 지도 */}
          <ItemMapComponent spotList={spotList} />

          {/* 버튼 (코스저장) */}
          {/*<ItemButtonComponent />*/}
        </div>
      </div>
  );
};

export default RightSideComponent;
