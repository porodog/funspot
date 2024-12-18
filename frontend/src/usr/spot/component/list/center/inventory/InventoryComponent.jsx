import ItemImageComponent from "../../left/inventory/item/ItemImageComponent";

const InventoryComponent = ({ image: { name, imageList } }) => {
  return (
    <div
      className="w-full h-1/4 pb-2 pr-2
flex flex-col justify-start border-b-2 border-gray-200"
    >
      {/* 상단 */}
      {/* 타이틀 */}
      <p
        className="w-full h-6 
    text-base text-gray-600
    font-medium font-mono"
      >
        {name}
      </p>

      {/* 하단 */}
      <div className="w-full h-24">
        {/* 이미지 */}
        <ItemImageComponent imageList={imageList} slideUnit={3} />
      </div>
    </div>
  );
};

export default InventoryComponent;
