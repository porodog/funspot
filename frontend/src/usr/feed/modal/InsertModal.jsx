import React, { useRef, useState } from "react";
import HashTagModal from "./HashTagModal";
import { API_BASE_URL, postFeedInsertApi } from "../api/FeedApi";

// 이미지 초기정보
const initImageSrc = `${API_BASE_URL}/api/usr/feed/image/no_image.jpg`;
const initImage = {
  upload_1: initImageSrc,
  upload_2: initImageSrc,
  upload_3: initImageSrc,
};

const InsertModal = ({ closeInsertModal }) => {
  const [feedContent, setFeedContent] = useState("");

  // 이미지
  const [feedImage, setFeedImage] = useState(initImage);
  const useFileRef = useRef([]);

  // 해시태그
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [isHashtagModalOpen, setIsHashtagModalOpen] = useState(false);

  // 해시태그 선택 모달 닫기
  const closeHashtagModal = () => {
    setIsHashtagModalOpen(false);
  };

  // 해시태그 추가
  const addHashtag = (hashtag) => {
    setSelectedHashtags((prevHashtags) => [...prevHashtags, hashtag]);
  };

  // 이미지 파일 선택
  const handleImageChange = (e) => {
    const fileId = e.target.id;
    const file = e.target.files[0];
    const getUrl = file ? URL.createObjectURL(file) : initImageSrc;
    setFeedImage({
      ...feedImage,
      [fileId]: getUrl,
    });
  };

  // 글 등록
  const handleFeedSubmit = () => {
    const form = new FormData();

    useFileRef.current.forEach((item) => {
      const itemFile = item.files[0];
      if (itemFile) {
        form.append("uploadFiles", itemFile);
      }
    });
    form.append("content", feedContent);

    postFeedInsertApi(form)
      .then((res) => {
        if (res.status !== 201) {
          console.log("등록 실패 에러코드 .." + res.status);
          return;
        }

        closeInsertModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-w-4xl p-6 relative">
        {/* 상단 툴바 X 버튼 */}
        <div className="flex justify-end items-center mb-4">
          <button
            onClick={closeInsertModal}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 상단영역: 프로필 정보 */}
        <div className="flex items-center space-x-4">
          <img
            src={initImageSrc}
            alt="프로필"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-lg">사용자 이름</p>
            <p className="text-sm text-gray-500">@user_id</p>
          </div>
        </div>

        {/* 중간영역: 글 내용 및 해시태그 */}
        <div className="mt-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="내용을 입력해주세요..(최대 80자)"
            rows="5"
            maxLength="80"
            value={feedContent}
            onChange={(e) => setFeedContent(e.target.value)}
          />
          <div className="mt-2 flex items-center space-x-2">
            <button
              className="text-blue-500"
              onClick={() => setIsHashtagModalOpen(true)}
            >
              해시태그 추가
            </button>
            <div className="flex flex-wrap space-x-2">
              {selectedHashtags.map((hashtag, index) => (
                <span key={index} className="text-sm text-blue-500">
                  {" "}
                  {hashtag}{" "}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 하단영역: 이미지 업로드 */}
        <div className="mt-4">
          <div className="flex justify-center">
            <div className="w-1/3 h-full">
              <img
                src={feedImage.upload_1}
                alt="upload_1"
                className="mt-4 border-solid border-2 border-indigo-400 rounded-md cursor-pointer w-full min-h-48 max-h-48 object-contain"
                onClick={() => {
                  document.querySelector("#upload_1").click();
                }}
              />
              <input
                type="file"
                id="upload_1"
                accept="image/*"
                ref={(e) => (useFileRef.current[0] = e)}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="w-1/3 ml-2 mr-2 h-full">
              <img
                src={feedImage.upload_2}
                alt="upload_2"
                className="mt-4 border-solid border-2 border-indigo-400 rounded-md cursor-pointer w-full min-h-48 max-h-48 object-contain"
                onClick={() => {
                  document.querySelector("#upload_2").click();
                }}
              />
              <input
                type="file"
                id="upload_2"
                accept="image/*"
                ref={(e) => (useFileRef.current[1] = e)}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="w-1/3 h-full">
              <img
                src={feedImage.upload_3}
                alt="upload_3"
                className="mt-4 border-solid border-2 border-indigo-400 rounded-md cursor-pointer w-full min-h-48 max-h-48 object-contain"
                onClick={() => {
                  document.querySelector("#upload_3").click();
                }}
              />
              <input
                type="file"
                id="upload_3"
                accept="image/*"
                ref={(e) => (useFileRef.current[2] = e)}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* 등록 버튼 */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleFeedSubmit}
            className="bg-blue-500 text-white py-2 px-6 rounded-md"
          >
            등록
          </button>
        </div>

        {/* 해시태그 모달 */}
        {isHashtagModalOpen && (
          <HashTagModal
            closeHashtagModal={closeHashtagModal}
            addHashtag={addHashtag}
          />
        )}
      </div>
    </div>
  );
};

export default InsertModal;
