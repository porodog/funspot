const ImageComponent = ({
  imageSrc,
  useFileRef,
  showDeleteButton,
  handleDeleteImage,
  handleImageChange,
}) => {
  return (
    <div className="w-1/3 h-full relative">
      <div className="w-full h-full rounded-full overflow-hidden border border-emerald-400">
        <img
          src={imageSrc}
          alt="upload"
          className="rounded-md cursor-pointer w-full h-full object-contain"
          onClick={() => useFileRef.current.click()}
        />
      </div>

      {/* 삭제 버튼: 이미지가 선택되었을 때만 표시 */}
      {showDeleteButton && (
        <button
          onClick={handleDeleteImage}
          className="absolute top-3 right-3 text-white bg-red-500 rounded-full px-2 border border-white"
        >
          X
        </button>
      )}

      <input
        type="file"
        accept="image/*"
        ref={useFileRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageComponent;
