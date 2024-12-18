import { FaRegStar, FaStar } from "react-icons/fa";

const ItemButtonComponent = ({ id, bookmark }) => {
  return (
    <div className="w-2/5 h-full relative flex content-end">
      {/* 즐겨찾기 버튼 */}
      {bookmark ? (
        <>
          <FaStar
            className="h-1/5 absolute top-2 right-3 cursor-pointer text-emerald-400 hover:text-emerald-500"
            size="1.4rem"
            onClick={() => console.log("click bookmark id >> " + id, bookmark)}
          />
        </>
      ) : (
        <>
          <FaRegStar
            className="h-1/5 absolute top-2 right-3 cursor-pointer hover:text-emerald-500"
            size="1.4rem"
            onClick={() => console.log("click bookmark id >> " + id, bookmark)}
          />
        </>
      )}

      {/* 담기 버튼 */}
      <button
        type="button"
        className="w-full ml-5 py-2 self-end 
        bg-emerald-400 
        text-white text-sm rounded-3xl 
        hover:bg-emerald-500"
        onClick={() => console.log("click button id >> " + id)}
      >
        내코스 담기
      </button>
    </div>
  );
};

export default ItemButtonComponent;
