import { useState } from "react";
import initSrc from "../../../../common/img/image_upload.jpg";

const ImageComponent = ({ id, useFileRef }) => {
  // 이미지 파일 선택
  const [imageSrc, setImageSrc] = useState(initSrc);
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image")) {
      setImageSrc(URL.createObjectURL(file));
      setShowDeleteButton(true);
    } else {
      window.alert("[파일첨부] 이미자타입의 파일을 첨부해주세요");
      setImageSrc(initSrc);
      e.target.value = "";
      setShowDeleteButton(false);
    }
  };

  // 이미지 파일 삭제버튼
  const [showDeleteButton, setShowDeleteButton] = useState(false); // X 버튼 표시 여부
  const handleDeleteImage = () => {
    setImageSrc(initSrc); // 이미지 삭제
    setShowDeleteButton(false); // 삭제 버튼 숨기기
    document.querySelector(`#${id}`).value = "";
  };

  return (
    <>
      <div
        className="w-1/3 h-56 relative items-center justify-center 
      rounded-3xl overflow-hidden border-2 border-gray-200 group"
      >
        <img
          src={imageSrc}
          alt="upload"
          className="w-full h-full object-contain shrink-0 cursor-pointer"
          onClick={() => document.querySelector(`#${id}`).click()}
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
          id={id}
          accept="image/*"
          ref={useFileRef}
          onChange={handleImageChange}
          className="hidden"
        />
      </div>
    </>
  );
};

export default ImageComponent;
