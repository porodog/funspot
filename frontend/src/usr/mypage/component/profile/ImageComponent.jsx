const ImageComponent = ({
  imageSrc,
  useFileRef,
  showDeleteButton,
  handleDeleteImage,
  handleImageChange,
}) => {
  return (
    <>
      <div
        className="w-52 h-52 relative items-center justify-center 
      rounded-full overflow-hidden border-2 border-emerald-400 group"
      >
        <img
          src={imageSrc}
          alt="upload"
          className="w-full h-full object-contain shrink-0 cursor-pointer"
          onClick={() => useFileRef.current.click()}
        />

        {showDeleteButton && (
          <div
            className="absolute top-0 left-0 w-full h-full 
          bg-gray-500 bg-opacity-50 flex items-center justify-center 
          opacity-0 group-hover:opacity-100 cursor-pointer"
            onClick={handleDeleteImage}
          >
            <span className="text-white text-3xl">X</span>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          ref={useFileRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
      <p className="font-bold mb-2">프로필 이미지</p>
    </>
  );
};

export default ImageComponent;
