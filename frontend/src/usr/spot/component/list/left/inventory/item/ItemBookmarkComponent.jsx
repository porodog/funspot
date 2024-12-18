import { FaRegStar, FaStar } from "react-icons/fa";

const ItemBookmarkComponent = ({ id, bookmark }) => {
  return (
    <>
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
    </>
  );
};

export default ItemBookmarkComponent;
