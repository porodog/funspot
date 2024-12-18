import ItemImageComponent from "./item/ItemImageComponent";
import ItemButtonComponent from "./item/ItemButtonComponent";
import ItemBookmarkComponent from "./item/ItemBookmarkComponent";
import ItemNameComponent from "./item/ItemNameComponent";

const InventoryComponent = ({
  spot: { id, name, bookmark, imageList },
  setSpotSelected,
}) => {
  return (
    <div
      className="w-full h-1/4 pb-2 pr-2
    flex flex-col justify-start border-b-2 border-gray-200"
    >
      {/* 상단 */}
      {/* 명소이름 */}
      <ItemNameComponent
        id={id}
        name={name}
        setSpotSelected={setSpotSelected}
      />

      {/* 하단 */}
      <div
        className="w-full h-24
      flex justify-start"
      >
        {/* 이미지 */}
        <ItemImageComponent imageList={imageList} slideUnit={2} />

        <div className="w-2/5 h-full pl-3 relative flex content-end">
          {/* 즐겨찾기 */}
          <ItemBookmarkComponent id={id} bookmark={bookmark} />
          {/* 담기 버튼 */}
          <ItemButtonComponent id={id} />
        </div>
      </div>
    </div>
  );
};

export default InventoryComponent;
