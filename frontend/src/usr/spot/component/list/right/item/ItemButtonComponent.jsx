const ItemButtonComponent = () => {
  return (
    <button
      type="button"
      className="px-6 py-4 absolute right-8 bottom-8
          bg-emerald-400 rounded-full
          text-white"
      onClick={() => console.log("코스 저장 click")}
    >
      코스 저장
    </button>
  );
};

export default ItemButtonComponent;
