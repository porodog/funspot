import ItemImageComponent from "./item/ItemImageComponent";
import ItemButtonComponent from "./item/ItemButtonComponent";

const InventoryComponent = ({ spot: { id, name, bookmark, imageList } }) => {
  console.log(imageList);
  return (
    <div
      className="w-full h-1/4 pb-2 pr-2
    flex flex-col justify-start border-b-2 border-gray-200"
    >
      {/* 상단 */}
      {/* 명소이름 */}
      <p
        className="w-full h-6 
        text-base text-gray-600
        font-medium font-mono 
        cursor-pointer
        hover:text-black"
        onClick={() => console.log("click id >> " + id)}
      >
        {name}
      </p>

      {/* 하단 */}
      {/* 아이템 (목록) */}
      <div
        className="w-full h-24
      flex justify-start"
      >
        {/* 이미지 */}
        <ItemImageComponent imageList={imageList} />

        {/* 즐겨찾기, 담기버튼 */}
        <ItemButtonComponent id={id} bookmark={bookmark} />
      </div>
    </div>
  );
};

export default InventoryComponent;
