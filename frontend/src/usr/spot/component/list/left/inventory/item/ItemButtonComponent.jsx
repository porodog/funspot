const ItemButtonComponent = ({ id }) => {
  return (
    <>
      <button
        type="button"
        className="w-full py-2 self-end 
        bg-emerald-400 
        text-white text-sm rounded-3xl 
        hover:bg-emerald-500"
        onClick={() => console.log("click button id >> " + id)}
      >
        내코스 담기
      </button>
    </>
  );
};

export default ItemButtonComponent;
